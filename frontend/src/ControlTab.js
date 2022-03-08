import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function ControlTab({ Controls, stream, myVideo, name }) {
  const commands = [
    {
      command: "reset",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: "open",
      callback: (site) => {
        window.open("http://" + site);
      },
    },
    {
      command: "change background color to",
      callback: (color) => {
        document.body.style.background = color;
      },
    },
  ];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  // const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return null;
  // }

  return (
    <div className="control-tab mb-3">
      {/* <div className="video">
        {stream && (
          <div className="video-area">
            <span class="badge rounded-pill bg-warning text-dark span-name">
              My View
            </span>
            <video muted ref={myVideo} autoPlay style={{ width: "300px" }} />
          </div>
        )}
      </div> */}
      <img
        style={{
          width: "120px",
          height: "120px",
          marginLeft: "50px",
        }}
        src="https://upload.wikimedia.org/wikipedia/vi/thumb/b/bf/Logo_HUET.svg/1200px-Logo_HUET.svg.png"
        alt=""
      />
      <h5
        className="d-flex flex-row mb-5 login"
        style={{ justifyContent: "center" }}
      >
        ĐIỀU KHIỂN ROBOT
      </h5>
      <div
        className="d-flex flex-row mb-4"
        style={{ justifyContent: "center" }}
      >
        <button
          onClick={() => Controls("U")}
          className="btn btn-outline-primary btn-control"
        >
          <img
            className="arrow-direct-img"
            src="https://cdn-icons-png.flaticon.com/512/892/892681.png"
            alt="forward"
          />
        </button>
      </div>
      <div
        className="d-flex flex-row"
        style={{ justifyContent: "space-between" }}
      >
        <button
          onClick={() => Controls("L")}
          className="btn btn-outline-primary btn-control"
        >
          <img
            className="arrow-direct-img"
            src="https://cdn-icons-png.flaticon.com/512/6364/6364318.png"
            alt="left"
          />
        </button>
        <button className="btn btn-danger btn-control">
          <img
            className="arrow-direct-img"
            src="https://cdn-icons-png.flaticon.com/512/827/827428.png"
            alt="stop"
          />
        </button>
        <button
          onClick={() => Controls("R")}
          className="btn btn-outline-primary btn-control"
        >
          <img
            className="arrow-direct-img"
            src="https://cdn-icons-png.flaticon.com/512/892/892653.png"
            alt="right"
          />
        </button>
      </div>
      <div
        className="d-flex flex-row mt-4"
        style={{ justifyContent: "center" }}
      >
        <button
          onClick={() => {
            Controls("B");
            console.log("B");
          }}
          className="btn btn-outline-primary btn-control"
        >
          <img
            className="arrow-direct-img"
            src="https://cdn-icons-png.flaticon.com/512/892/892623.png"
            alt="back"
          />
        </button>
      </div>
    </div>
  );
}

export default ControlTab;
