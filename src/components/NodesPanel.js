import React from "react";

const NodesPanel = ({ onAddTextNode }) => {
  return (
    <div>
      <button className="NodesPanel-button" onClick={onAddTextNode}>
        Add Message
      </button>
      {/* Future buttons for different node types will go here */}
    </div>
  );
};

export default NodesPanel;
