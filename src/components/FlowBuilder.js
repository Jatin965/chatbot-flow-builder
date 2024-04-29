import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  useNodesState,
  useEdgesState,
} from "reactflow";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import SendMessageNode from "./Sub/SendMessageNode";

const nodeTypes = {
  sendMessage: SendMessageNode, // Registered custom node component
};

const FlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => {
      // Check if there is already an edge from the source handle
      const existingEdge = edges.find(
        (e) => e.source === params.source && e.sourceHandle === params.sourceHandle
      );

      // If there's an existing edge from the source handle, do not add a new edge
      if (!existingEdge) {
        setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds));
      } else {
        alert("Only one edge can originate from a source handle.");
      }
    },
    [edges, setEdges]
  );

  // Node selection event
  const onNodeClick = useCallback(
    (event, node) => {
      console.log("Clicked");
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  const onPaneClick = () => setSelectedNode(null);

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

  const updateNodeText = useCallback(
    (text) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id ? { ...node, data: { label: text } } : node
        )
      );
      setSelectedNode({ ...selectedNode, data: { label: text } });
    },
    [setNodes, selectedNode]
  );

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

  return (
    <div className="flow-builder">
      <div className="save-button-wrapper">
        <button className="save-button" onClick={onSaveFlow}>
          Save Flow
        </button>
      </div>
      <div className="flow-builder-container">
        <div className="flow-builder-workspace">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>

        <div className="panels">
          {selectedNode ? (
            <SettingsPanel
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              updateNodeText={updateNodeText}
            />
          ) : (
            <NodesPanel onAddTextNode={onAddTextNode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowBuilder;
