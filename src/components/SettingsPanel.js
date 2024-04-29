import React from "react";

const SettingsPanel = ({ selectedNode, updateNodeText }) => {
  if (!selectedNode) return null;

  return (
    <div>
      <textarea
        type="text"
        className="settings-panel-input"
        value={selectedNode.data.label}
        onChange={(e) => updateNodeText(e.target.value)}
      />
    </div>
  );
};

export default SettingsPanel;
