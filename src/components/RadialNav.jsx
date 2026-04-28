import { useState } from "react";
import { NODES, ORBIT_RADIUS } from "../data/nodes";
import CenterNode from "./CenterNode";
import OrbitNode from "./OrbitNode";
import ConnectorLine from "./ConnectorLine";
import ContentPanel from "./ContentPanel";

// Compute the angle (radians) for each node, starting from top (−π/2)
const getAngle = (index, total) => (index / total) * 2 * Math.PI - Math.PI / 2;

const RadialNav = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const handleCenterClick = () => {
    setExpanded((prev) => !prev);
    // Reset active node when collapsing
    if (expanded) setActiveId(null);
  };

  const handleNodeClick = (id) => {
    setActiveId((prev) => (prev === id ? null : id)); // toggle off if re-clicked
  };

  const activeNode = NODES.find((n) => n.id === activeId) ?? null;

  return (
    <div className="radial-wrapper">
      <div className="radial-stage">
        {/* Connector spokes */}
        {NODES.map((node, i) => (
          <ConnectorLine
            key={node.id}
            angle={getAngle(i, NODES.length)}
            radius={ORBIT_RADIUS}
            color={node.shadow}
            visible={expanded}
          />
        ))}

        {/* Center "Moki" button */}
        <CenterNode
          expanded={expanded}
          active={Boolean(activeNode)}
          onClick={handleCenterClick}
        />

        {/* Orbit nodes */}
        {NODES.map((node, i) => (
          <OrbitNode
            key={node.id}
            node={node}
            index={i}
            angle={getAngle(i, NODES.length)}
            radius={ORBIT_RADIUS}
            expanded={expanded}
            isActive={activeId === node.id}
            isDimmed={activeId !== null && activeId !== node.id}
            onClick={handleNodeClick}
          />
        ))}

        {/* "tap a node" hint */}
        <div className={`explore-hint ${expanded && !activeId ? "show" : ""}`}>
          tap a node to explore
        </div>
      </div>

      {/* Content panel — slides in when a node is active */}
      <ContentPanel node={activeNode} />
    </div>
  );
};

export default RadialNav;
