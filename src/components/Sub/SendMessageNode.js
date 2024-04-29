import React from "react";
import ReactFlow, { Handle, Position } from "reactflow";

// Define your custom node component
const SendMessageNode = ({ data }) => {
  return (
    <div className="custom-node">
      <div className="node-header">Send Message</div>
      <div className="node-content">{data.label}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default SendMessageNode;
