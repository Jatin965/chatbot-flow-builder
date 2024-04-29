import { Icon } from "@iconify/react";
import React from "react";

const SettingsPanel = ({ selectedNode, updateNodeText, setSelectedNode }) => {
  if (!selectedNode) return null;

  return (
    <div className="settings-panel">
      <div className="settings-head">
        <Icon icon="ic:round-arrow-back" onClick={() => setSelectedNode(null)} />
        <p>Message</p>
        <div />
      </div>
      <p className="heading">Text</p>
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
