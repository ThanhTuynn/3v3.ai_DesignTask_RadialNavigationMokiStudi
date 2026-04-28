import { useEffect, useState } from "react";

const OrbitNode = ({
  node,
  index,
  angle,
  radius,
  expanded,
  isActive,
  isDimmed,
  onClick,
}) => {
  const [positioned, setPositioned] = useState(false);

  // Stagger the appearance of each node
  useEffect(() => {
    if (!expanded) {
      setPositioned(false);
      return;
    }
    const timer = setTimeout(() => setPositioned(true), 40 + index * 55);
    return () => clearTimeout(timer);
  }, [expanded, index]);

  const tx = Math.cos(angle) * radius;
  const ty = Math.sin(angle) * radius;

  const translateStyle = positioned
    ? `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(${isActive ? 1.15 : 1})`
    : "translate(-50%, -50%) scale(0)";

  return (
    <div
      className={[
        "orbit-node",
        positioned && expanded ? "visible" : "",
        isActive ? "active" : "",
        isDimmed ? "dimmed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: node.color,
        boxShadow: `0 4px 18px ${node.shadow}, 0 0 0 5px ${node.shadow.replace("0.5", "0.15")}`,
        transform: translateStyle,
        animationDelay: `${index * 0.18}s`,
      }}
      onClick={() => expanded && onClick(node.id)}
      role="button"
      aria-label={node.label}
      aria-pressed={isActive}
    >
      {typeof node.icon === "string" && node.icon.includes("/") ? (
        <img src={node.icon} alt={node.label} className="node-icon" />
      ) : (
        <span className="node-icon" role="img" aria-hidden="true">
          {node.icon}
        </span>
      )}
      <span className="node-label">{node.label}</span>
    </div>
  );
};

export default OrbitNode;
