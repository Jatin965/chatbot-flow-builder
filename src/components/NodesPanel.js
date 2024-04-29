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
        Add Message
      </div>
      {/* Future buttons for different node types will go here */}
    </div>
  );
};

export default NodesPanel;
