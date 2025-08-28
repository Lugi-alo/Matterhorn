import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import PhaseNode from "../../components/Phase-node/PhaseNode";

export default function PhaseCanvas({ nodes, edges }) {
  const nodeTypes = { phase: PhaseNode };

  return (
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
      <Background />
      <Controls />
    </ReactFlow>
  );
}
