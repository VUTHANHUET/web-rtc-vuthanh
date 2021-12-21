import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
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

  const InSpeed = () => {
    if (speed < 95) {
      setSpeed(speed + 5);
    } else setSpeed(speed);
  };
  const DeSpeed = () => {
    if (speed > 5) {
      setSpeed(speed - 5);
    } else setSpeed(speed);
  };
  console.log(speed);
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

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#fff" }}>
        Phòng Zoom của Thành
      </h1>
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
                  controls
                  style={!callEnded ? { width: "400px" } : { width: "600px" }}
                />
              )}
            </div>
            <div className="video">
              {callAccepted && !callEnded ? (
                <video
                  playsInline
                  ref={userVideo}
                  autoPlay
                  style={{ width: "400px" }}
                />
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
            {/* {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary" onClick={leaveCall}>
                End Call
              </Button>
            ) : ( */}
            <IconButton
              color="primary"
              aria-label="call"
              onClick={() => callUser(idToCall)}
            >
              <PhoneIcon fontSize="large" />
            </IconButton>
            {/* )} */}
            {/* {idToCall} */}
          </div>
        </div>
        <div
          className={
            callAccepted && !callEnded ? "myControl d-flex" : "myControl d-none"
          }
          style={{ flexDirection: "column" }}
        >
          <h5
            className="d-flex flex-row mb-5"
            style={{ justifyContent: "center" }}
          >
            ĐIỀU KHIỂN ROBOT
          </h5>
          <div className="d-flex flex-row" style={{ justifyContent: "center" }}>
            <button className="btn btn-outline-primary ">FORWARD</button>
          </div>
          <div
            className="d-flex flex-row"
            style={{ justifyContent: "space-between" }}
          >
            <button className="btn btn-outline-primary">LEFT</button>
            <button className="btn btn-outline-primary">RIGHT</button>
          </div>
          <div className="d-flex flex-row" style={{ justifyContent: "center" }}>
            <button className="btn btn-outline-primary">BACK</button>
          </div>
          {/* <div className="mt-5 d-block">
            <button
              className="btn btn-outline-primary mb-1"
              onClick={() => DeSpeed()}
            >
              -
            </button>
            <div className="progress">
              <div
                className="progress-bar w-75"
                role="progressbar"
                aria-valuenow={speed}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <button
              className="btn btn-outline-primary mt-1"
              onClick={() => InSpeed()}
            >
              +
            </button>
          </div> */}
        </div>

        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
