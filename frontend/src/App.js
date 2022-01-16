import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import ControlTab from "./ControlTab";
import "./App.css";

// const socket = io.connect("http://localhost:5000");
const socket = io.connect("https://vuthanh-rtc-server.herokuapp.com/");
function App() {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const [speed, setSpeed] = useState(70);

  // Tăng tốc độ động cơ
  const InSpeed = () => {
    if (speed < 95) {
      setSpeed(speed + 5);
    } else setSpeed(speed);
  };
  // Giảm tốc độ động cơ
  const DeSpeed = () => {
    if (speed > 5) {
      setSpeed(speed - 5);
    } else setSpeed(speed);
  };
  const Controls = (role) => {
    socket.emit("Client-send", role);
    console.log(role);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };
  const denyCall = () => {
    setCallAccepted(false);
    setReceivingCall(false);
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#fff" }}>Master View</h1>

      {/* button leave call */}
      {callAccepted && !callEnded ? (
        <button
          onClick={() => leaveCall()}
          className={"btn btn-danger end-call-button d-block"}
        >
          End Call
        </button>
      ) : null}

      <div className="container">
        <div className="video-container">
          <div>
            <div className="video">
              {stream && (
                <video
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                  // controls
                  style={!callEnded ? { width: "800px" } : { width: "800px" }}
                />
              )}
            </div>
            <div>
              {receivingCall && !callAccepted ? (
                <div className="caller">
                  <h4>{name} đang gọi cho bạn...</h4>
                  <button
                    className="btn btn-info me-3"
                    onClick={() => answerCall()}
                  >
                    <b>Answer</b>
                  </button>
                  <button className="btn btn-danger" onClick={() => denyCall()}>
                    <b>Deny</b>
                  </button>
                </div>
              ) : null}
            </div>
            <div className="video">
              {callAccepted && !callEnded ? (
                <div className="video-area" style={{ position: "relative" }}>
                  <span class="badge rounded-pill bg-warning text-dark span-name">
                    {name}
                  </span>
                  <video
                    playsInline
                    ref={userVideo}
                    autoPlay
                    style={{ width: "800px" }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={callAccepted && !callEnded ? "myId d-none" : "myId "}>
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AssignmentIcon fontSize="large" />}
            >
              Copy ID
            </Button>
          </CopyToClipboard>

          <TextField
            id="filled-basic"
            label="ID to call"
            variant="filled"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <div className="call-button">
            <IconButton
              color="primary"
              aria-label="call"
              onClick={() => callUser(idToCall)}
            >
              <PhoneIcon fontSize="large" />
            </IconButton>
            {idToCall}
          </div>
        </div>
        <div
          className={
            callAccepted && !callEnded ? "myControl d-flex" : "myControl d-none"
          }
          style={{ flexDirection: "column" }}
        >
          <ControlTab stream={stream} myVideo={myVideo} Controls={Controls} />
        </div>
      </div>
    </div>
  );
}

export default App;
