import { Icon } from "@iconify/react";
import React from "react";

const NodesPanel = ({ onAddTextNode }) => {
  return (
    <div className="nodes-panel">
      <div
        className="nodes-panel-button"
        draggable
        onDragEnd={onAddTextNode}
        onClick={onAddTextNode}
      >
        <Icon icon="humbleicons:chat" height={30} width={30} />
        <p>Add Message</p>
      </div>
      {/* Future buttons for different node types will go here */}
    </div>
  );
};

export default NodesPanel;
