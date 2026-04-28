const ContentPanel = ({ node }) => {
  return (
    <div
      className={`content-panel ${node ? "visible" : ""}`}
      role="region"
      aria-live="polite"
    >
      {node && (
        <>
          {typeof node.icon === "string" && node.icon.includes("/") ? (
            <img src={node.icon} alt={node.label} className="panel-icon" />
          ) : (
            <span className="panel-icon" role="img" aria-label={node.label}>
              {node.icon}
            </span>
          )}
          <div className="panel-title">{node.label}</div>
          <div className="panel-desc">{node.desc}</div>
        </>
      )}
    </div>
  );
};

export default ContentPanel;
