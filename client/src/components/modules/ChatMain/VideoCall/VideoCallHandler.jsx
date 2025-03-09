import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { selectUserData } from "../../../../store/slices/auth.slice";
import { createSocketService, SocketEvents } from "../../../../services/socket";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import VideoCall from "../VideoCall/VideoCall.jsx";

// Import ringtone
import ringtone from "/Users/arpitpatidar/Downloads/College Project/client/public/assets/alarme_motiva_o.mp3";

const Chat = ({ conversationUser }) => {
    const user = useSelector(selectUserData);
    const userId = user?._id;
    const chatContainerRef = useRef(null);

    const [socketService, setSocketService] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isInCall, setIsInCall] = useState(false);
    const [callRequest, setCallRequest] = useState(null);

    const localStreamRef = useRef(null);
    const remoteStreamRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const ringtoneRef = useRef(new Audio(ringtone)); // Ringtone audio instance

    useEffect(() => {
        if (!userId || !conversationUser?._id) return;

        const socket = createSocketService(userId);
        setSocketService(socket);

        socket.joinChat([conversationUser._id]);

        socket.socket.on(SocketEvents.NEW_MESSAGE, ({ message }) => {
            setMessages((prev) => [...prev, message]);
            scrollToBottom();
        });

        peerConnectionRef.current = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        // Send ICE candidates
        peerConnectionRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.socket.emit(SocketEvents.ICE_CANDIDATE, {
                    to: conversationUser._id,
                    candidate: event.candidate,
                });
            }
        };

        // Set remote stream when received
        peerConnectionRef.current.ontrack = (event) => {
            if (event.streams.length > 0) {
                remoteStreamRef.current.srcObject = event.streams[0];
            }
        };

        // Handle call events
        socket.handleCallEvents(peerConnectionRef.current, remoteStreamRef, {
            onOffer: ({ from, offer }) => {
                if (from !== userId) {
                    setCallRequest({ from, offer });
                    playRingtone();
                }
            },
            onAnswer: (answer) => {
                peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
            },
            onCallRejected: () => {
                stopRingtone();
                setIsInCall(false);
                endCall();
            },
            onCallEnded: () => {
                stopRingtone();
                setIsInCall(false);
                endCall();
            },
        });

        return () => {
            socket.socket.off(SocketEvents.NEW_MESSAGE);
            socket.socket.off(SocketEvents.OFFER);
            stopRingtone();
            socket.disconnect();
        };
    }, [userId, conversationUser._id]);

    const startCall = async () => {
        if (!socketService) return;
        setIsInCall(true);

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current.srcObject = stream;

        const peer = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
        peerConnectionRef.current = peer;

        stream.getTracks().forEach((track) => peer.addTrack(track, stream));

        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);

        socketService.socket.emit(SocketEvents.CALL_USER, {
            from: userId,
            to: conversationUser._id,
            offer,
            type: "video"
        });
    };

    const acceptCall = async () => {
        if (!socketService || !callRequest) return;
        stopRingtone(); // Stop ringtone when call is accepted
        setIsInCall(true);
        setCallRequest(null);

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current.srcObject = stream;

        const peer = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
        peerConnectionRef.current = peer;

        stream.getTracks().forEach((track) => peer.addTrack(track, stream));

        await peer.setRemoteDescription(new RTCSessionDescription(callRequest.offer));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);

        socketService.socket.emit(SocketEvents.ANSWER, { to: callRequest.from, answer });
    };

    const endCall = () => {
        stopRingtone();
        setIsInCall(false);
        localStreamRef.current?.srcObject?.getTracks().forEach((track) => track.stop());
        remoteStreamRef.current?.srcObject?.getTracks().forEach((track) => track.stop());
        peerConnectionRef.current?.close();
        socketService?.endCall(conversationUser._id);
    };

    const rejectCall = () => {
        if (!socketService || !callRequest) return;
        stopRingtone(); // Stop ringtone when call is rejected
        socketService.socket.emit(SocketEvents.CALL_REJECTED, { to: callRequest.from });
        setCallRequest(null);
    };

    const playRingtone = () => {
        const ringtoneAudio = ringtoneRef.current;
        ringtoneAudio.loop = true;
        ringtoneAudio.play().catch((error) => console.error("Failed to play ringtone:", error));
    };

    const stopRingtone = () => {
        const ringtoneAudio = ringtoneRef.current;
        ringtoneAudio.pause();
        ringtoneAudio.currentTime = 0; // Reset audio to start
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
            _id: new Date().getTime().toString(),
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
                    <Box ref={chatContainerRef} sx={{ flex: 1, overflowY: "auto" }}>
                        <MessageList messages={messages} />
                    </Box>
                    <MessageInput input={input} setInput={setInput} handleSendMessage={handleSendMessage} />
                </>
            )}

            {/* Incoming Call Modal */}
            <Dialog open={!!callRequest} onClose={rejectCall}>
                <DialogTitle>Incoming Call</DialogTitle>
                <DialogContent>
                    <p>{callRequest?.from} is calling you.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={rejectCall} color="error">Reject</Button>
                    <Button onClick={acceptCall} color="primary">Accept</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Chat;
