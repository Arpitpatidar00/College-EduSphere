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

        const socket = createSocketService(userId);
        setSocketService(socket);

        socket.joinChat([conversationUser._id]);

        socket.socket.on(SocketEvents.NEW_MESSAGE, ({ message }) => {
            setMessages((prev) => [...prev, message]);
            scrollToBottom();
        });

        setupPeerConnection(socket);

        return () => {
            socket.socket.off(SocketEvents.NEW_MESSAGE);
            socket.disconnect();
        };
    }, [userId, conversationUser._id]);

    const setupPeerConnection = (socket) => {
        peerConnectionRef.current = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        peerConnectionRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.socket.emit(SocketEvents.ICE_CANDIDATE, {
                    to: conversationUser._id,
                    candidate: event.candidate,
                });
            }
        };

        socket.handleCallEvents(peerConnectionRef.current, remoteStreamRef, {
            onOffer: ({ from, offer }) => from !== userId && setCallRequest({ from, offer }),
            onAnswer: (answer) => peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer)),
            onCallRejected: () => resetCallState(),
            onCallEnded: () => resetCallState(),
        });
    };

    const startCall = async () => {
        if (!socketService) return;
        setIsInCall(true);
        try {
            const stream = await getMediaStream();
            setupPeer(stream);

            const offer = await peerConnectionRef.current.createOffer();
            await peerConnectionRef.current.setLocalDescription(offer);
            socketService.socket.emit(SocketEvents.CALL_USER, { from: userId, to: conversationUser._id, offer, type: "video" });
        } catch (error) {
            console.error("Error starting call:", error);
        }
    };

    const acceptCall = async () => {
        if (!socketService || !callRequest) return;
        setIsInCall(true);
        setCallRequest(null);
        try {
            const stream = await getMediaStream();
            setupPeer(stream);

            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(callRequest.offer));
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);
            socketService.socket.emit(SocketEvents.ANSWER, { to: callRequest.from, answer });
        } catch (error) {
            console.error("Error accepting call:", error);
        }
    };

    const getMediaStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localStreamRef.current) localStreamRef.current.srcObject = stream;
        return stream;
    };

    const setupPeer = (stream) => {
        peerConnectionRef.current = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
        stream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, stream));

        peerConnectionRef.current.ontrack = (event) => {
            if (event.streams.length > 0 && remoteStreamRef.current) {
                remoteStreamRef.current.srcObject = event.streams[0];
            }
        };
    };

    useEffect(() => {
        if (!socketService) return;
        socketService.socket.on(SocketEvents.ICE_CANDIDATE, async ({ candidate }) => {
            if (candidate && peerConnectionRef.current) {
                try {
                    await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                } catch (error) {
                    console.error("Error adding ICE Candidate:", error);
                }
            }
        });

        return () => socketService.socket.off(SocketEvents.ICE_CANDIDATE);
    }, [socketService]);

    const endCall = () => {
        resetCallState();
        socketService?.socket.emit(SocketEvents.CALL_ENDED, { to: conversationUser._id });
    };

    const rejectCall = () => {
        socketService?.socket.emit(SocketEvents.CALL_REJECTED, { to: callRequest.from });
        setCallRequest(null);
    };

    const resetCallState = () => {
        setIsInCall(false);

        [localStreamRef, remoteStreamRef].forEach(ref => {
            if (ref.current && ref.current.srcObject instanceof MediaStream) {  // ✅ Check if it's a MediaStream
                ref.current.srcObject.getTracks().forEach(track => track.stop());
                ref.current.srcObject = null; // ✅ Clear the srcObject
            }
        });

        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
    };


    const scrollToBottom = () => {
        chatContainerRef.current && setTimeout(() => chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight, 100);
    };

    const handleSendMessage = () => {
        if (!input.trim() || !socketService) return;
        const messageData = { _id: Date.now().toString(), conversationId: conversationUser._id, content: input, messageType: "text", senderId: userId, status: "sent" };
        socketService.sendMessage(messageData, conversationUser._id);
        setMessages((prev) => [...prev, { ...messageData, sender: "self" }]);
        setInput("");
        scrollToBottom();
    };

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", padding: 2 }}>
            <ChatHeader conversationUser={conversationUser} handleCall={startCall} />
            {isInCall ? <VideoCall localStreamRef={localStreamRef} remoteStreamRef={remoteStreamRef} onEndCall={endCall} /> : (
                <>
                    <Box ref={chatContainerRef} sx={{ flex: 1, overflowY: "auto" }}>
                        <MessageList messages={messages} />
                    </Box>
                    <MessageInput input={input} setInput={setInput} handleSendMessage={handleSendMessage} />
                </>
            )}
            <Dialog open={!!callRequest} onClose={rejectCall}>
                <DialogTitle>Incoming Call</DialogTitle>
                <DialogContent><p>{callRequest?.from} is calling you.</p></DialogContent>
                <DialogActions>
                    <Button onClick={rejectCall} color="error">Reject</Button>
                    <Button onClick={acceptCall} color="primary">Accept</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Chat;
