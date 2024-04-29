import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import SendMessageNode from "./Sub/SendMessageNode";

const FlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const [selectedNode, setSelectedNode] = useState(null);

  const onAddTextNode = () => {
    const newNode = {
      id: `text-node-${nodes.length + 1}`,
      type: "sendMessage",
      data: { label: `Text Message ${nodes.length + 1}` },
      position: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === "custom").data.selects[
        edge.sourceHandle
      ];
      edge.type = edgeType;
    }

    return edge;
  });

  const onSaveFlow = () => {
    const invalidNodes = nodes.filter(
      (node) =>
        edges.filter((edge) => edge.target === node.id).length === 0 &&
        nodes.length > 1
    );

    if (invalidNodes.length > 0) {
      alert("Error: There are nodes with empty target handles.");
      return;
    }

    console.log("Flow saved successfully:", { nodes, edges });
  };

  const nodeTypes = {
    sendMessage: SendMessageNode, // Register your custom node component
  };

  return (
    <div className="FlowBuilder">
      <div className="SaveButton-wrapper">
        <button className="SaveButton" onClick={onSaveFlow}>
          Save Flow
        </button>
      </div>
      <div className="FlowBuilder-container">
        <div className="FlowBuilder-workspace">
          <ReactFlow
            nodes={nodes}
            edges={edgesWithUpdatedTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
          >
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>

        <div className="Panels">
          {selectedNode ? (
            <SettingsPanel selectedNode={selectedNode} updateNodeText={() => {}} />
          ) : (
            <NodesPanel onAddTextNode={onAddTextNode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowBuilder;
