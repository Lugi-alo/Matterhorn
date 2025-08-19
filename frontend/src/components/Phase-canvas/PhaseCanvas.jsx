import React from "react";
import {useState, useCallback} from "react";
import ReactFlow, {Background, Controls} from "reactflow";

import PhaseNode from "../../components/Phase-node/PhaseNode";

const nodeTypes = {phase: PhaseNode};

export default function PhaseCanvas({workflow, setWorkflow}) {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    return (
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
            <Background />
            <Controls />
        </ReactFlow>
    )
}
