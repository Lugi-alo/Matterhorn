import {Handle, Position} from "reactflow";

import "./PhaseNode.scss";

export default function PhaseNode({ data }) {
  return (
    <div className="node">
      <input type="text" placeholder="Name" value={data.name} onChange={(e) => data.onChange("name", e.target.value)} />
      <input type="text" placeholder="Description" value={data.description} onChange={(e) => data.onChange("description", e.target.value)} />
      <input type="number" placeholder="Duration" value={data.duration} onChange={(e) => data.onChange("duration", e.target.value)} />
    </div>
  );
}
