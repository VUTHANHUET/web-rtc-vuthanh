import React from "react";
import { useState } from "react";
function ControlTab({ Controls, stream, myVideo, name, heartrate, spo2 }) {
  const [tab, setTab] = useState(true);
  console.log("tab", tab);
  return (
    <div className="control-tab ">
      <div className="nav-tab btn-group mb-5 mt-3 ">
        <button
          className="tab-button"
          style={
            tab == 1 ? { backgroundColor: "#1697EE", color: "white" } : null
          }
          onClick={() => setTab(1)}
        >
          {" "}
          Điều khiển
        </button>
        <button
          className="tab-button"
          style={
            tab == 0 ? { backgroundColor: "#1697EE", color: "white" } : null
          }
          onClick={() => setTab(0)}
        >
          {" "}
          Thông tin
        </button>
      </div>
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
      <div className={tab == 1 ? "logo mt-5" : "logo mt-5 d-none"}>
        <img
          style={{
            width: "120px",
            height: "120px",
            marginLeft: "70px",
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
          {/* <button
          onClick={() => Controls("U")}
          className="btn btn-outline-primary btn-control"
        >
          <img
            className="arrow-direct-img"
            src="https://cdn-icons.flaticon.com/png/512/5548/premium/5548780.png?token=exp=1649705098~hmac=0eb822fd961c52faaa97872f73707992"
            alt="upleft"
          />
        </button> */}
          <button
            onClick={() => Controls("F")}
            className="btn btn-outline-primary btn-control"
          >
            <img
              className="arrow-direct-img"
              src="https://cdn-icons-png.flaticon.com/512/892/892681.png"
              alt="forward"
            />
          </button>
          {/* <button
          onClick={() => Controls("U")}
          className="btn btn-outline-primary btn-control"
        >
          <img
            className="arrow-direct-img"
            src="https://cdn-icons.flaticon.com/png/512/5548/premium/5548768.png?token=exp=1649705125~hmac=d7a695dbe10c77453be902f372004abb"
            alt="upright"
          />
        </button> */}
        </div>
        <div className="d-flex flex-row" style={{ justifyContent: "center" }}>
          <button
            onClick={() => Controls("L")}
            className="btn btn-outline-primary btn-control me-3"
          >
            <img
              className="arrow-direct-img"
              src="https://cdn-icons-png.flaticon.com/512/6364/6364318.png"
              alt="left"
            />
          </button>
          <button
            className="btn btn-danger btn-control"
            onClick={() => Controls("S")}
          >
            <img
              className="arrow-direct-img"
              src="https://cdn-icons-png.flaticon.com/512/827/827428.png"
              alt="stop"
            />
          </button>
          <button
            onClick={() => Controls("R")}
            className="btn btn-outline-primary btn-control ms-3"
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
          {/* <button
          onClick={() => Controls("U")}
          className="btn btn-outline-primary btn-control"
        >
          <img
            className="arrow-direct-img"
            src="https://cdn-icons.flaticon.com/png/512/5548/premium/5548803.png?token=exp=1649705117~hmac=eb72a8a4629388b8d9d46213a33881bb"
            alt="downleft"
          />
        </button> */}
          <button
            onClick={() => {
              Controls("B");
            }}
            className="btn btn-outline-primary btn-control"
          >
            <img
              className="arrow-direct-img"
              src="https://cdn-icons-png.flaticon.com/512/892/892623.png"
              alt="back"
            />
          </button>
          {/* <button
          onClick={() => Controls("U")}
          className="btn btn-outline-primary btn-control"
        >
          <img
            className="arrow-direct-img"
            src="https://cdn-icons.flaticon.com/png/512/5548/premium/5548789.png?token=exp=1649705116~hmac=982587190e3ff8c01361473172e5a068"
            alt="downright"
          />
        </button> */}
        </div>
      </div>
      <div className={tab == 0 ? "infor-view" : "infor-view d-none"}>
        <div className="inforTab">
          <div className="sensor-container">
            <b>Heart Rate</b>
            <img
              style={{
                width: "70px",
                height: "70px",
                marginTop: "10px",
              }}
              src="https://cdn-icons-png.flaticon.com/512/4403/4403838.png"
              alt=""
            />
            <p>{heartrate} BPM</p>
          </div>
          <div className="sensor-container">
            <b>SPO2</b>
            <img
              style={{
                width: "70px",
                height: "70px",
                marginTop: "10px",
              }}
              src="https://cdn-icons-png.flaticon.com/128/2451/2451287.png"
              alt=""
            />
            <p>{spo2} %</p>
          </div>
        </div>
        <div className="inforTab">
          <div className="sensor-container">
            <b>Blood Pressure</b>
            <img
              style={{
                width: "70px",
                height: "70px",
                marginTop: "10px",
              }}
              src="https://cdn-icons-png.flaticon.com/128/2855/2855513.png"
              alt=""
            />
            <p>no data</p>
          </div>
          <div className="sensor-container">
            <b>Temperature</b>
            <img
              style={{
                width: "70px",
                height: "70px",
                marginTop: "10px",
              }}
              src="https://cdn-icons-png.flaticon.com/128/1684/1684375.png"
              alt=""
            />
            <p>no data</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlTab;
