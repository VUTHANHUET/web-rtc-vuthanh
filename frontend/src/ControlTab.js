import React from "react";

function ControlTab({ Controls, stream, myVideo }) {
  return (
    <div className="control-tab">
      <div className="video">
        {stream && (
          <div className="video-area">
            <span class="badge rounded-pill bg-warning text-dark span-name">
              Controller
            </span>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              // controls
              style={{ width: "300px" }}
            />
          </div>
        )}
      </div>
      <h5 className="d-flex flex-row mb-5" style={{ justifyContent: "center" }}>
        ĐIỀU KHIỂN ROBOT
      </h5>
      <div
        className="d-flex flex-row mb-4"
        style={{ justifyContent: "center" }}
      >
        <button
          //   onClick={() => Controls("U")}
          className="btn btn-outline-primary btn-control"
        >
          <img
            className="arrow-direct-img"
            src="https://cdn-icons.flaticon.com/png/512/2267/premium/2267904.png?token=exp=1642359001~hmac=a77aaa20fd123048761ac2e3e38af958"
            alt="forward"
          />
        </button>
      </div>
      <div
        className="d-flex flex-row"
        style={{ justifyContent: "space-between" }}
      >
        <button
          //   onClick={() => Controls("L")}
          className="btn btn-outline-primary btn-control"
        >
          <img
            className="arrow-direct-img"
            src="https://cdn-icons.flaticon.com/png/512/2267/premium/2267909.png?token=exp=1642359347~hmac=c81100b0aa89df7ecce18fc3b5cfddcf"
            alt="left"
          />
        </button>
        <button
          //   onClick={() => Controls("S")}
          className="btn btn-danger btn-control"
        >
          <img
            className="arrow-direct-img"
            src="https://cdn-icons-png.flaticon.com/512/827/827428.png"
            alt="stop"
          />
        </button>
        <button
          //   onClick={() => Controls("R")}
          className="btn btn-outline-primary btn-control"
        >
          <img
            className="arrow-direct-img"
            src="https://cdn-icons.flaticon.com/png/512/2267/premium/2267911.png?token=exp=1642359266~hmac=b083425c65935de6ae6f270b58e5a36d"
            alt="right"
          />
        </button>
      </div>
      <div
        className="d-flex flex-row mt-4"
        style={{ justifyContent: "center" }}
      >
        <button
          //   onClick={() => Controls("B")}
          className="btn btn-outline-primary btn-control"
        >
          <img
            className="arrow-direct-img"
            src="https://cdn-icons.flaticon.com/png/128/2267/premium/2267906.png?token=exp=1642359259~hmac=f46847110e7dac2cfe5e423d99b6d87f"
            alt="back"
          />
        </button>
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
  );
}

export default ControlTab;
