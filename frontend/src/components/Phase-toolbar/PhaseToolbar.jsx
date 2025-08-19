export default function Toolbar ({ onAddPhase, onPlay}) {
    return (
    <div>
        <button onclick={onAddPhase}> Add Phase </button>
        <button onclick={onPlay}> Play </button>
    </div>
    );
}