export default function CogButton({ onClick }: { onClick: () => any }) {
  return (
    <button
      style={{ pointerEvents: "auto" }}
      title="settings-button"
      className="cog-button"
      onClick={onClick}
    >
      <img src="icons/cog.svg" width="35px" height="35px" />
    </button>
  );
}
