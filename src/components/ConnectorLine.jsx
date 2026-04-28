// Renders a single radial spoke from center to a node position
const ConnectorLine = ({ angle, radius, color, visible }) => {
  const angleDeg = (angle * 180) / Math.PI;

  return (
    <div
      className={`connector-line ${visible ? "visible" : ""}`}
      style={{
        width: `${radius}px`,
        transform: `rotate(${angleDeg}deg)`,
        background: color,
      }}
    />
  );
};

export default ConnectorLine;