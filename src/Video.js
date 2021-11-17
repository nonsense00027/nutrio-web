import { useEffect, useRef, useState } from "react";
import "./App.css";
import { db } from "./shared/configs/firebase";

const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

function App() {
  const videoRef = useRef();
  const remoteVideoRef = useRef();
  const [myLocalStream, setMyLocalStream] = useState(null);
  const [shareLocalStream, setShareLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [cachedLocalPC, setCachedLocalPC] = useState();

  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    startLocalStream();
  }, []);

  const startLocalStream = async () => {
    const myStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    const shareStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setMyLocalStream(myStream);
    setShareLocalStream(shareStream);
    videoRef.current.srcObject = myStream;
  };

  const startCall = async () => {
    const id = "sample";
    const localPC = new RTCPeerConnection(configuration);
    localPC.addStream(shareLocalStream);

    const roomRef = await db.collection("rooms").doc(id);
    const callerCandidatesCollection = roomRef.collection("callerCandidates");
    localPC.onicecandidate = (e) => {
      if (!e.candidate) {
        console.log("Got final candidate!");
        return;
      }
      callerCandidatesCollection.add(e.candidate.toJSON());
    };

    localPC.onaddstream = (e) => {
      if (e.stream && remoteStream !== e.stream) {
        console.log("RemotePC received the stream call", e.stream);
        setRemoteStream(e.stream);
        remoteVideoRef.current.srcObject = e.stream;
      }
    };

    const offer = await localPC.createOffer();
    await localPC.setLocalDescription(offer);

    const roomWithOffer = { offer };
    console.log("room with offer", roomWithOffer.offer);
    await roomRef.set({ offer: roomWithOffer.offer.toJSON() });

    roomRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      if (!localPC.currentRemoteDescription && data.answer) {
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await localPC.setRemoteDescription(rtcSessionDescription);
      }
    });

    roomRef.collection("calleeCandidates").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          await localPC.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    setCachedLocalPC(localPC);
  };

  console.log("remote stream", remoteStream);

  return (
    <div className="App">
      <h1>video</h1>
      <button onClick={startCall}>start call</button>
      {myLocalStream && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          width={300}
          height={300}
        ></video>
      )}
      {remoteStream && (
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          width={300}
          height={300}
        ></video>
      )}
    </div>
  );
}

export default App;
