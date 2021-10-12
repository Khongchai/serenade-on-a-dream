export default function CogButton({ onClick }: { onClick: () => any }) {
  return (
    <button title="settings-button" className="cog-button" onClick={onClick}>
      <img src="icons/cog.svg" width="35px" height="35px" />
    </button>
  );
}
