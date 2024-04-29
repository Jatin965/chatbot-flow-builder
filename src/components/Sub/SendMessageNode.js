import React from "react";
import ReactFlow, { Handle, Position } from "reactflow";
import { Icon } from "@iconify/react";

// Define your custom node component
const SendMessageNode = ({ data }) => {
  return (
    <div className="custom-node" onClick={() => console.log("Clicked Custom")}>
      <div className="node-header">
        <p>
          <Icon icon="humbleicons:chat" height={16} width={16} />
          Send Message
        </p>
        <div className="icon-wrapper">
          <Icon icon="logos:whatsapp-icon" />
        </div>
      </div>
      <div className="node-content">{data.label}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default SendMessageNode;
