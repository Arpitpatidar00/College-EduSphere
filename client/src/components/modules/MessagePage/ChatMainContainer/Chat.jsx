import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { selectUserData } from "../../../../store/slices/auth.slice";
import { createSocketService, SocketEvents } from "../../../../services/socket";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import VideoCall from "../VideoCall/VideoCall.jsx";
import ringtone from "/assets/alarme_motiva_o.mp3"; // Ensure correct path

// Helper: Compute conversation ID for one-to-one chats
const roomId = (userId, conversationUser) => {
    // If it’s a group chat, assume conversationUser._id is the group ID
    if (conversationUser.isGroupChat) return conversationUser._id;
    // Otherwise, generate a unique conversation id by sorting the user IDs
    return [userId, conversationUser._id].sort().join("_");
};

const Chat = ({ conversationUser }) => {
    const user = useSelector(selectUserData);
    const userId = user?._id;
    const chatContainerRef = useRef(null);
    const localStreamRef = useRef(null);
    const remoteStreamRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const ringtoneRef = useRef(new Audio(ringtone));

    const [socketService, setSocketService] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isInCall, setIsInCall] = useState(false);
    const [callRequest, setCallRequest] = useState(null);
    const [callType, setCallType] = useState("video");
    const [typingIndicator, setTypingIndicator] = useState(false);

    // Compute conversation ID (works for both one-to-one and group chats)
    const conversationId = roomId(userId, conversationUser);

    useEffect(() => {
        if (!userId || !conversationUser?._id) return;

        const socket = createSocketService(userId);
        setSocketService(socket);
        // Join the conversation room with the computed conversationId
        socket.joinChat([roomId]);


        socket.socket.on(SocketEvents.MESSAGE_RECEIVED, ({ message }) => {
            console.log("Received message:", message);
            setMessages((prev) => [...prev, message]);
            scrollToBottom();
        });

        socket.socket.on(SocketEvents.OFFER, handleIncomingOffer);
        socket.socket.on(SocketEvents.ANSWER, handleIncomingAnswer);
        socket.socket.on(SocketEvents.ICE_CANDIDATE, handleIncomingIceCandidate);
        socket.socket.on(SocketEvents.CALL_REJECTED, handleCallRejected);
        socket.socket.on(SocketEvents.CALL_ENDED, handleCallEnded);

        // Subscribe to typing events
        socket.listenToTyping(({ conversationId: roomId, userId: typingUserId }) => {
            // Only show typing if the event is for this conversation and not from self
            if (roomId.toString() === conversationId.toString() && typingUserId !== userId) {
                setTypingIndicator(true);
                // Remove typing indicator after a delay (e.g., 3 seconds)
                setTimeout(() => setTypingIndicator(false), 3000);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, conversationUser._id, conversationId]);

    const handleIncomingOffer = ({ from, offer, type }) => {
        if (from !== userId) {
            setCallRequest({ from, offer, type });
            setCallType(type);
            ringtoneRef.current.play();
            ringtoneRef.current.loop = true;
        }
    };

    const handleIncomingAnswer = async ({ answer }) => {
        if (peerConnectionRef.current) {
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        }
    };

    const handleIncomingIceCandidate = async ({ candidate }) => {
        if (candidate && peerConnectionRef.current) {
            await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
    };

    const handleCallRejected = () => {
        stopRingtone();
        resetCallState();
    };

    const handleCallEnded = () => {
        stopRingtone();
        resetCallState();
    };

    const startCall = async (type = "video") => {
        if (!socketService) return;
        setIsInCall(true);
        setCallType(type);

        try {
            createPeerConnection();
            const stream = await getMediaStream(type);
            if (localStreamRef.current) localStreamRef.current.srcObject = stream;

            stream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, stream));

            const offer = await peerConnectionRef.current.createOffer();
            await peerConnectionRef.current.setLocalDescription(offer);

            // Use conversationId to emit the call event
            socketService.socket.emit(SocketEvents.CALL_USER, {
                from: userId,
                to: conversationUser._id, // For one-to-one, this remains the same; for group call, handle separately if needed
                offer,
                type,
            });
        } catch (error) {
            console.error("Error starting call:", error);
            resetCallState();
        }
    };

    const acceptCall = async () => {
        if (!socketService || !callRequest) return;
        setIsInCall(true);
        stopRingtone();

        try {
            createPeerConnection();
            const stream = await getMediaStream(callRequest.type);
            if (localStreamRef.current) localStreamRef.current.srcObject = stream;

            stream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, stream));

            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(callRequest.offer));

            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);

            socketService.socket.emit(SocketEvents.ANSWER, {
                to: callRequest.from,
                answer,
            });
        } catch (error) {
            console.error("Error accepting call:", error);
            resetCallState();
        } finally {
            setCallRequest(null);
        }
    };

    const createPeerConnection = () => {
        if (!socketService) return;
        peerConnectionRef.current = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        peerConnectionRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                socketService.socket.emit(SocketEvents.ICE_CANDIDATE, {
                    // For ICE, use the conversation partner’s id (for one-to-one) or handle group ICE candidate exchange as needed
                    to: conversationUser._id,
                    candidate: event.candidate,
                });
            }
        };

        peerConnectionRef.current.ontrack = (event) => {
            if (event.streams.length > 0 && remoteStreamRef.current) {
                remoteStreamRef.current.srcObject = event.streams[0];
            }
        };
    };

    const endCall = () => {
        if (socketService) {
            socketService.socket.emit(SocketEvents.CALL_ENDED, { to: conversationUser._id });
        }
        resetCallState();
    };

    const rejectCall = () => {
        if (socketService && callRequest?.from) {
            socketService.socket.emit(SocketEvents.CALL_REJECTED, { to: callRequest.from });
        }
        stopRingtone();
        setCallRequest(null);
    };

    const resetCallState = () => {
        setIsInCall(false);
        stopRingtone();

        [localStreamRef, remoteStreamRef].forEach((ref) => {
            const vidEl = ref.current;
            if (vidEl && vidEl.srcObject instanceof MediaStream) {
                vidEl.srcObject.getTracks().forEach((track) => track.stop());
                vidEl.srcObject = null;
            }
        });

        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
    };

    const stopRingtone = () => {
        ringtoneRef.current.pause();
        ringtoneRef.current.currentTime = 0;
    };

    const getMediaStream = async (type) => {
        return navigator.mediaDevices.getUserMedia(
            type === "audio" ? { audio: true } : { video: true, audio: true }
        );
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            setTimeout(() => {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }, 100);
        }
    };

    const handleSendMessage = () => {
        if (!input.trim() || !socketService) return;

        const messageData = {
            _id: Date.now().toString(), // use UUID in production
            conversationId, // use the computed conversationId
            content: input,
            messageType: "text",
            senderId: userId,
            status: "sent",
        };

        // Optimistically add message locally
        setMessages((prev) => [...prev, messageData]);

        // Send through socket
        socketService.sendMessage(messageData, conversationId);

        setInput("");
        scrollToBottom();
    };

    // Handle input change with typing notification
    const handleInputChange = (e) => {
        setInput(e.target.value);
        if (socketService && conversationId) {
            socketService.sendTypingNotification(roomId, !!conversationUser.conversationId);

        }
    };

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: "calc(100vh - 64px)",
                maxHeight: { xs: "calc(100vh - 70px)", md: "calc(100vh - 64px)" },
                overflow: "hidden",
                bgcolor: "background.default",
            }}
        >
            <ChatHeader
                conversationUser={conversationUser}
                handleCall={startCall}
                sx={{ px: { xs: 0, md: 2 } }} // Responsive padding for header
            />

            {isInCall ? (
                <VideoCall
                    localStreamRef={localStreamRef}
                    remoteStreamRef={remoteStreamRef}
                    onEndCall={endCall}
                    sx={{
                        flex: 1,
                        overflow: "hidden",
                        height: { xs: "50vh", sm: "60vh", md: "70vh", lg: "80vh" }, // Responsive height
                    }}
                />
            ) : (
                <>
                    <MessageList
                        messages={messages}
                        chatContainerRef={chatContainerRef}
                        typingIndicator={typingIndicator}
                        conversationUser={conversationUser}
                        userId={userId}
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            p: { xs: 1, md: 2 }, // Responsive padding
                            maxHeight: { xs: "calc(100vh - 200px)", sm: "calc(100vh - 180px)", md: "calc(100vh - 150px)" }, // Adjust for smaller screens
                        }}
                    />
                    <MessageInput
                        input={input}
                        setInput={setInput}
                        handleSendMessage={handleSendMessage}
                        handleTyping={handleInputChange}
                        sx={{
                            p: { xs: 1, md: 2 }, // Responsive padding
                            minHeight: { xs: "60px", md: "80px" }, // Minimum height for input area
                        }}
                    />
                </>
            )}

            <Dialog
                open={!!callRequest}
                onClose={rejectCall}
                sx={{
                    "& .MuiDialog-paper": {
                        width: { xs: "90%", sm: "80%", md: "50%" }, // More flexible width
                        maxWidth: { xs: "300px", sm: "350px", md: "400px" }, // Constrain based on screen
                        borderRadius: 2,
                        bgcolor: "background.paper",
                        p: { xs: 1, md: 2 }, // Responsive padding
                    },
                }}
            >
                <DialogTitle sx={{ fontSize: { xs: "1rem", md: "1.25rem" }, fontWeight: "bold" }}>
                    Incoming {callType} Call
                </DialogTitle>
                <DialogContent sx={{ py: { xs: 0.5, md: 1 } }}>
                    <Box sx={{ wordBreak: "break-word", fontSize: { xs: "0.9rem", md: "1rem" } }}>
                        {callRequest?.from} is calling you.
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: { xs: 1, md: 2 }, pb: { xs: 1, md: 2 } }}>
                    <Button
                        onClick={rejectCall}
                        color="error"
                        variant="outlined"
                        sx={{ minWidth: { xs: "80px", md: "100px" }, fontSize: { xs: "0.75rem", md: "1rem" } }}
                    >
                        Reject
                    </Button>
                    <Button
                        onClick={acceptCall}
                        color="primary"
                        variant="contained"
                        sx={{ minWidth: { xs: "80px", md: "100px" }, fontSize: { xs: "0.75rem", md: "1rem" } }}
                    >
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Chat;