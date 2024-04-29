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
  const onNodeClick = useCallback((_, node) => {
    console.log("Clicked")
    setSelectedNode(node);
  }, []);

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
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, label: text } }
            : node
        )
      );
    },
    [setNodes, selectedNode]
  );

  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === "sendMessage").data.selects[
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
    sendMessage: SendMessageNode, // Registered custom node component
  };

  console.log("selected", selectedNode);

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
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onElementClick={onNodeClick}
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
