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

    useEffect(() => {
        if (!userId || !conversationUser?._id) return;

        const socket = createSocketService(userId);
        setSocketService(socket);
        socket.joinChat([conversationUser._id]);

        socket.socket.on(SocketEvents.MESSAGE_RECEIVED, ({ message }) => {
            console.log('message: ', message);
            setMessages((prev) => [...prev, message]);
            scrollToBottom();
        });

        socket.socket.on(SocketEvents.OFFER, handleIncomingOffer);
        socket.socket.on(SocketEvents.ANSWER, handleIncomingAnswer);
        socket.socket.on(SocketEvents.ICE_CANDIDATE, handleIncomingIceCandidate);
        socket.socket.on(SocketEvents.CALL_REJECTED, handleCallRejected);
        socket.socket.on(SocketEvents.CALL_ENDED, handleCallEnded);

        return () => {
            socket.disconnect();
        };
    }, [userId, conversationUser._id]);

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

            socketService.socket.emit(SocketEvents.CALL_USER, {
                from: userId,
                to: conversationUser._id,
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

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", padding: 2 }}>
            <ChatHeader conversationUser={conversationUser} handleCall={startCall} />

            {isInCall ? (
                <VideoCall localStreamRef={localStreamRef} remoteStreamRef={remoteStreamRef} onEndCall={endCall} />
            ) : (
                <>
                    <Box sx={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                        <MessageList messages={messages} chatContainerRef={chatContainerRef} />
                    </Box>
                    <MessageInput input={input} setInput={setInput} handleSendMessage={handleSendMessage} />
                </>
            )}

            <Dialog open={!!callRequest} onClose={rejectCall}>
                <DialogTitle>Incoming {callType} Call</DialogTitle>
                <DialogContent>{callRequest?.from} is calling you.</DialogContent>
                <DialogActions>
                    <Button onClick={rejectCall} color="error">Reject</Button>
                    <Button onClick={acceptCall} color="primary">Accept</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Chat;
