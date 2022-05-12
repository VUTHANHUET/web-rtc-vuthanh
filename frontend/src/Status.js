import React from "react";

import { useMqttState } from "mqtt-react-hooks";
import { useSubscription } from "mqtt-react-hooks";

export default function Status() {
  /*
   * Status list
   * - Offline
   * - Connected
   * - Reconnecting
   * - Closed
   * - Error: printed in console too
   */
  const { connectionStatus } = useMqttState();
  const { client } = useMqttState();
  const { message } = useSubscription(["room/lamp"]);

  function handleClick(message) {
    return client.publish("room/lamp", message);
  }
  return (
    <div>
      <h3>{`Status: ${connectionStatus}`}</h3>
      <button className="btn btn-primary" onClick={() => handleClick("on")}>
        Disable led
      </button>
      {/* <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{`topic:${message.topic} - message: ${message.message}`}</span>
      </div> */}
    </div>
  );
}
