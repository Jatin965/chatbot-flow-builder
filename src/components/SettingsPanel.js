import React from "react";

const SettingsPanel = ({ selectedNode, updateNodeText }) => {
  if (!selectedNode) return null;

  const handleInputChange = (event) => {
    updateNodeText(selectedNode.id, event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        className="SettingsPanel-input"
        value={selectedNode.data.label}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SettingsPanel;
