interface SevDotsProps {
  level: string;
  color: string;
  size?: number;
  gap?: number;
}

export default function SevDots({ level, color, size = 6, gap = 3 }: SevDotsProps) {
  const n = level === "mild" ? 1 : level === "bad" ? 2 : 3;
  return (
    <span style={{ display: "inline-flex", gap, alignItems: "center" }}>
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: 99,
            background: color,
            display: "inline-block",
          }}
        />
      ))}
    </span>
  );
}
