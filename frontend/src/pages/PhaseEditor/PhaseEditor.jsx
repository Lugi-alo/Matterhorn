import React, { useState } from "react";
import "reactflow/dist/style.css";
import "./PhaseEditor.scss";

import PhaseCanvas from "../../components/Phase-canvas/PhaseCanvas";
import PhaseToolbar from "../../components/Phase-toolbar/PhaseToolbar"
import { initialiseWorkflow, advanceWorkflow } from "../../api/phases";

export default function PhaseEditor() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const addPhase = () => {
    console.log("WOrking");
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

  const onPlay = () => {
    console.log("Phases:", nodes); 
  };

  const handleInitialise = async () => {
    try {
      const phases = nodes.map((n) => ({
        unique: parseInt(n.id),
        name: n.data.name,
        description: n.data.description,
        duration: n.data.duration,
      }));

      const response = await initialiseWorkflow(phases);
      console.log("Initialised workflow:", response);
    } catch (err) {
      console.error("Error initialising workflow:", err);
    }
  };

  const handleAdvance = async () => {
    try {
      const response = await advanceWorkflow();
      setWorkflow(response);
      console.log("Advanced workflow:", response);
    } catch (err) {
      console.error("Error advancing workflow:", err);
    }
  };

  return (
    <div className="editor">
      <div className="toolbar">
        <PhaseToolbar addPhase={addPhase} onPlay={onPlay} onInitialise={handleInitialise} onAdvance={handleAdvance} />

      </div>

      <div className="flow-container">
        <PhaseCanvas nodes={nodes} edges={edges} fitView />
      </div>
    </div>
  );
}
