import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { selectUserData } from "../../../../store/slices/auth.slice";
import { createSocketService, SocketEvents } from "../../../../services/socket";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import VideoCall from "../VideoCall/VideoCall.jsx";

const Chat = ({ conversationUser }) => {
    const user = useSelector(selectUserData);
    const userId = user?._id;

    const chatContainerRef = useRef(null);
    const localStreamRef = useRef(null);
    const remoteStreamRef = useRef(null);
    const peerConnectionRef = useRef(null);

    const [socketService, setSocketService] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isInCall, setIsInCall] = useState(false);
    const [callRequest, setCallRequest] = useState(null);

    useEffect(() => {
        if (!userId || !conversationUser?._id) return;

        // 1) Create & store the socket service
        const socket = createSocketService(userId);
        setSocketService(socket);

        // 2) Join the chat room
        socket.joinChat([conversationUser._id]);

        // 3) Listen for new incoming messages
        socket.socket.on(SocketEvents.NEW_MESSAGE, ({ message }) => {
            setMessages((prev) => [...prev, message]);
            scrollToBottom();
        });

        // 4) Handle incoming WebRTC signals (Offer, Answer, ICE, etc.)
        socket.socket.on(SocketEvents.OFFER, handleIncomingOffer);
        socket.socket.on(SocketEvents.ANSWER, handleIncomingAnswer);
        socket.socket.on(SocketEvents.ICE_CANDIDATE, handleIncomingIceCandidate);
        socket.socket.on(SocketEvents.CALL_REJECTED, handleCallRejected);
        socket.socket.on(SocketEvents.CALL_ENDED, handleCallEnded);

        return () => {
            // Clean up listeners on unmount
            socket.socket.off(SocketEvents.NEW_MESSAGE);
            socket.socket.off(SocketEvents.OFFER);
            socket.socket.off(SocketEvents.ANSWER);
            socket.socket.off(SocketEvents.ICE_CANDIDATE);
            socket.socket.off(SocketEvents.CALL_REJECTED);
            socket.socket.off(SocketEvents.CALL_ENDED);
            socket.disconnect();
        };
    }, [userId, conversationUser._id]);

    // ─────────────────────────────────────────────────────────────────────────────
    // WebRTC Handlers
    // ─────────────────────────────────────────────────────────────────────────────

    const handleIncomingOffer = ({ from, offer, type }) => {
        // Another user is calling us
        if (from !== userId) {
            setCallRequest({ from, offer, type });
        }
    };

    const handleIncomingAnswer = async ({ answer }) => {
        // Our call partner accepted and sent an Answer
        if (peerConnectionRef.current) {
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        }
    };

    const handleIncomingIceCandidate = async ({ candidate }) => {
        if (candidate && peerConnectionRef.current) {
            try {
                await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (error) {
                console.error("Error adding ICE Candidate:", error);
            }
        }
    };

    const handleCallRejected = () => {
        // Our call request was rejected
        resetCallState();
    };

    const handleCallEnded = () => {
        // The other user ended the call
        resetCallState();
    };

    const startCall = async () => {
        if (!socketService) return;
        setIsInCall(true);

        try {
            // 1) Create the PeerConnection
            createPeerConnection();

            // 2) Get local media (audio/video)
            const stream = await getMediaStream();
            // Show your own camera locally
            if (localStreamRef.current) {
                localStreamRef.current.srcObject = stream;
            }

            // 3) Add your local tracks to the PeerConnection
            stream.getTracks().forEach((track) =>
                peerConnectionRef.current.addTrack(track, stream)
            );

            // 4) Create & send Offer
            const offer = await peerConnectionRef.current.createOffer();
            await peerConnectionRef.current.setLocalDescription(offer);

            socketService.socket.emit(SocketEvents.CALL_USER, {
                from: userId,
                to: conversationUser._id,
                offer,
                type: "video",
            });
        } catch (error) {
            console.error("Error starting call:", error);
            resetCallState();
        }
    };

    const acceptCall = async () => {
        if (!socketService || !callRequest) return;
        setIsInCall(true);

        try {
            // 1) Create the PeerConnection
            createPeerConnection();

            // 2) Get local media
            const stream = await getMediaStream();
            if (localStreamRef.current) {
                localStreamRef.current.srcObject = stream;
            }

            // 3) Add your local tracks to the PeerConnection
            stream.getTracks().forEach((track) =>
                peerConnectionRef.current.addTrack(track, stream)
            );

            // 4) Set remote description from the Offer we received
            await peerConnectionRef.current.setRemoteDescription(
                new RTCSessionDescription(callRequest.offer)
            );

            // 5) Create & send Answer
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
            // Clear the incoming call request
            setCallRequest(null);
        }
    };

    /**
     * Create/Initialize the RTCPeerConnection & attach its event handlers
     */
    const createPeerConnection = () => {
        if (!socketService) return;
        peerConnectionRef.current = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        // 1) Send ICE candidates to the other peer
        peerConnectionRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                socketService.socket.emit(SocketEvents.ICE_CANDIDATE, {
                    to: conversationUser._id,
                    candidate: event.candidate,
                });
            }
        };

        // 2) Receive remote tracks (this is how we get the other person's video)
        peerConnectionRef.current.ontrack = (event) => {
            if (event.streams.length > 0 && remoteStreamRef.current) {
                remoteStreamRef.current.srcObject = event.streams[0];
            }
        };
    };

    const endCall = () => {
        // We choose to hang up
        if (socketService) {
            socketService.socket.emit(SocketEvents.CALL_ENDED, {
                to: conversationUser._id,
            });
        }
        resetCallState();
    };

    const rejectCall = () => {
        if (socketService && callRequest?.from) {
            socketService.socket.emit(SocketEvents.CALL_REJECTED, {
                to: callRequest.from,
            });
        }
        setCallRequest(null);
    };

    const resetCallState = () => {
        setIsInCall(false);

        // Stop local & remote tracks
        [localStreamRef, remoteStreamRef].forEach((ref) => {
            const vidEl = ref.current;
            if (vidEl && vidEl.srcObject instanceof MediaStream) {
                vidEl.srcObject.getTracks().forEach((track) => track.stop());
                vidEl.srcObject = null;
            }
        });

        // Close PeerConnection
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
    };

    // ─────────────────────────────────────────────────────────────────────────────
    // Utility / Messaging
    // ─────────────────────────────────────────────────────────────────────────────

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
            _id: Date.now().toString(),
            conversationId: conversationUser._id,
            content: input,
            messageType: "text",
            senderId: userId,
            status: "sent",
        };
        socketService.sendMessage(messageData, conversationUser._id);
        setMessages((prev) => [...prev, { ...messageData, sender: "self" }]);
        setInput("");
        scrollToBottom();
    };

    const getMediaStream = async () => {
        return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    };

    // ─────────────────────────────────────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────────────────────────────────────

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", padding: 2 }}>
            <ChatHeader conversationUser={conversationUser} handleCall={startCall} />

            {isInCall ? (
                <VideoCall
                    localStreamRef={localStreamRef}
                    remoteStreamRef={remoteStreamRef}
                    onEndCall={endCall}
                />
            ) : (
                <>
                    {/* Chat UI */}
                    <Box ref={chatContainerRef} sx={{ flex: 1, overflowY: "auto" }}>
                        <MessageList messages={messages} />
                    </Box>
                    <MessageInput
                        input={input}
                        setInput={setInput}
                        handleSendMessage={handleSendMessage}
                    />
                </>
            )}

            {/* Incoming Call Dialog */}
            <Dialog open={!!callRequest} onClose={rejectCall}>
                <DialogTitle>Incoming Call</DialogTitle>
                <DialogContent>
                    <p>{callRequest?.from} is calling you.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={rejectCall} color="error">
                        Reject
                    </Button>
                    <Button onClick={acceptCall} color="primary">
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Chat;
