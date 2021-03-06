import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";

import React, { useEffect, useRef, useState } from "react";
import { Connector } from "mqtt-react-hooks";
import Status from "./Status";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import ControlTab from "./ControlTab";
import "./App.css";

// const socket = io.connect("http://localhost:5000");
const socket = io.connect("https://vuthanh-rtc-server.herokuapp.com/");
// const socket = io.connect("http://192.168.1.22:5000/");

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
  const [he, setHe] = useState(0);
  const [sp, setSp] = useState(0);
  const Controls = (role) => {
    socket.emit("Client-send-control", role);
  };
  // yêu cầu quyền truy cập vào cam và mic
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
  useEffect(() => {
    socket.on("Server-send-he", (he) => {
      setHe(he.toString());
      // console.log("11", temp);
    });
    socket.on("Server-send-sp", (sp) => {
      setSp(sp.toString());
    });
  }, [he, sp]);

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
    window.location.reload();
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", color: "#fff" }}>SV. Vũ Đình Thành</h3>
      <h5 style={{ textAlign: "center", color: "#fff" }}>
        GVHD: Ts.Phạm Đức Quang{" "}
      </h5>
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
        <div className="video-container col-8">
          <div>
            <div>
              <div
                className={callAccepted ? "video-area" : "video-area d-none"}
              >
                <span class="badge rounded-pill bg-warning text-dark span-name">
                  My View
                </span>
                <video
                  playsInline
                  muted
                  ref={userVideo}
                  autoPlay
                  style={{ width: "800px", height: "600px" }}
                />
              </div>
              <div
                className="video-area"
                style={
                  callAccepted
                    ? {
                        position: "relative",
                        top: "-37em",
                        right: "-32em",
                        width: "200px",
                        height: "150px",
                      }
                    : { width: "800px", height: "600px" }
                }
              >
                <span class="badge rounded-pill bg-warning text-dark span-name">
                  {callAccepted ? "User View" : "My View"}
                </span>
                <video playsInline muted ref={myVideo} autoPlay />
              </div>
            </div>
            {/* Thông báo kết nối */}

            {receivingCall && !callAccepted ? (
              <div className="caller">
                <h4>{name} đang yêu cầu kết nối...</h4>
                <div>
                  <button
                    className="btn btn-info me-3"
                    onClick={() => answerCall()}
                  >
                    <b>Đồng ý</b>
                  </button>
                  <button className="btn btn-danger" onClick={() => denyCall()}>
                    <b>Từ chối</b>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={
            callAccepted && !callEnded ? "myId d-none col-4" : "myId col-4"
          }
        >
          <img
            style={{
              width: "120px",
              height: "120px",
            }}
            src="https://upload.wikimedia.org/wikipedia/vi/thumb/b/bf/Logo_HUET.svg/1200px-Logo_HUET.svg.png"
            alt=""
          />
          <h2 className="login mb-5">Đăng Nhập</h2>
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
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />

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
          </div>
          {/* {he}
          <br></br>
          {sp} */}
        </div>
        <div
          className={
            callAccepted && !callEnded
              ? "myControl d-flex col-4"
              : "myControl d-none col-4"
          }
          style={{ flexDirection: "column" }}
        >
          <ControlTab
            spo2={sp}
            heartrate={he}
            stream={stream}
            myVideo={myVideo}
            Controls={Controls}
            name={name}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
