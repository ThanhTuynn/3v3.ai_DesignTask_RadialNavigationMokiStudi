const CenterNode = ({ expanded, onClick }) => {
  const centerContent = !expanded ? (
    <img
      className="center-icon"
      src="/assets/Emoji_Moki/Emoji_Question.png"
      alt="Question"
    />
  ) : (
    <img
      className="center-icon"
      src="/assets/Emoji_Moki/Emoji_Happy.png"
      alt="Happy"
    />
  );

  return (
    <>
      {/* Pulse ring — only shown when collapsed */}
      {!expanded && <div className="pulse-ring" />}

      <div
        className={`center-node ${expanded ? "expanded" : ""}`}
        onClick={onClick}
        role="button"
        aria-label={expanded ? "Collapse menu" : "Open Moki menu"}
        aria-expanded={expanded}
      >
        {centerContent}
        <span className="center-hint">
          {expanded ? "Tap Again!" : "Tap Me!"}
        </span>
      </div>
    </>
  );
};

export default CenterNode;
