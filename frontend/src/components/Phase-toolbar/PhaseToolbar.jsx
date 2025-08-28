import React from "react";

export default function PhaseToolbar({ addPhase, onPlay, handleInitialise, handleAdvance }) {
  return (
    <div>
        <button onClick={addPhase}> Add Phase </button>
        <button onClick={onPlay}> Play </button>
        <button onClick={handleInitialise}> Initialise </button>
        <button onClick={handleAdvance}> Advance </button>
    </div>
  );
}
