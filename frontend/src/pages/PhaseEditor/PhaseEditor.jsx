import React from "react";
import {useState, useCallback} from "react"
import ReactFlow from "reactflow";
import {Background, Controls} from "reactflow";
import "reactflow/dist/style.css";
import "./PhaseEditor.scss";

import PhaseNode from "../../components/Phase-node/PhaseNode";


const nodeTypes = { phase: PhaseNode };

export default function PhaseCanvas() {

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const addPhase = () => {
  const id = String(nodes.length + 1);

  const newNode = {
    id: id,
    type: "phase",
    position: { x: 100 * nodes.length, y: 200 },
    data: {
      name: "",
      description: "",
      duration: "",
      onChange: (field, value) => {
        setNodes((nds) => {
          const updatedNodes = [];

          for (let i = 0; i < nds.length; i++) {
            const node = nds[i];

            if (node.id === id) {
              let updatedName = node.data.name;
              let updatedDescription = node.data.description;
              let updatedDuration = node.data.duration;

              if (field === "name") {
                updatedName = value;
              } else if (field === "description") {
                updatedDescription = value;
              } else if (field === "duration") {
                updatedDuration = value;
              }

              updatedNodes.push({
                id: node.id,
                type: node.type,
                position: node.position,
                data: {
                  name: updatedName,
                  description: updatedDescription,
                  duration: updatedDuration,
                  onChange: node.data.onChange,
                },
              });
            } else {
              updatedNodes.push(node);
            }
          }
          return updatedNodes;
        });
      },
    },
  };

  setNodes((previousNodes) => previousNodes.concat(newNode));
};

  const playPhases = () => {
    console.log("Phases:", nodes); 
  };

  return (
    <div className="editor">
  <div className="toolbar">
    <button onClick={addPhase}>Add Phase</button>
    <button onClick={playPhases}>Play</button>
  </div>

  <div className="flow-container">
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
      <Background />
      <Controls />
    </ReactFlow>
  </div>
</div>

  );
}
