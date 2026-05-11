interface IconProps {
  name: string;
  size?: number;
  stroke?: number;
  color?: string;
}

export default function Icon({ name, size = 28, stroke = 2, color = "currentColor" }: IconProps) {
  const s = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "headache":
      return <svg {...s}><path d="M13 2 4 14h6l-2 8 10-12h-6l1-8z" /></svg>;
    case "nausea":
      return <svg {...s}><circle cx="12" cy="12" r="9" /><path d="M8.5 15.5c1-1 2.5-1 3.5 0s2.5 1 3.5 0" /><circle cx="9" cy="10" r="0.6" fill={color} stroke="none"/><circle cx="15" cy="10" r="0.6" fill={color} stroke="none"/></svg>;
    case "stomach":
      return <svg {...s}><path d="M12 2c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4-.5 2 .5 3 2 3-2-2 0-5 0-8z" /></svg>;
    case "fatigue":
      return <svg {...s}><path d="M7 6h6L7 14h6" /><path d="M14 12h5l-5 6h5" /></svg>;
    case "anxiety":
      return <svg {...s}><path d="M20 8.5C20 5.5 17.5 3.5 15 4c-1.5.3-2.5 1.3-3 2.5C11.5 5.3 10.5 4.3 9 4 6.5 3.5 4 5.5 4 8.5c0 4 4 6.5 8 10.5 4-4 8-6.5 8-10.5z" /><path d="M4 12h3l1.5-2 2 4 1.5-2H16" /></svg>;
    case "pain":
      return <svg {...s}><rect x="2" y="9" width="20" height="6" rx="3" transform="rotate(-25 12 12)" /><circle cx="10" cy="12" r="0.6" fill={color} stroke="none"/><circle cx="14" cy="12" r="0.6" fill={color} stroke="none"/><circle cx="12" cy="10" r="0.6" fill={color} stroke="none"/><circle cx="12" cy="14" r="0.6" fill={color} stroke="none"/></svg>;
    case "plus":
      return <svg {...s}><path d="M12 5v14M5 12h14" /></svg>;
    case "clock":
      return <svg {...s}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "settings":
      return <svg {...s}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg>;
    case "x":
      return <svg {...s}><path d="M18 6L6 18M6 6l12 12" /></svg>;
    case "leaf":
      return <svg {...s}><path d="M4 20s2-7 8-12c4-3 8-3 8-3s0 4-3 8c-5 6-12 8-12 8z M4 20l8-8" /></svg>;
    case "sun":
      return <svg {...s}><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" /></svg>;
    case "chevron-left":
      return <svg {...s}><path d="M15 18l-6-6 6-6" /></svg>;
    case "chevron-right":
      return <svg {...s}><path d="M9 6l6 6-6 6" /></svg>;
    default:
      return null;
  }
}
