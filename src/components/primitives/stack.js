const gapMap = {
  sm: "var(--space-3)",
  md: "var(--space-4)",
  lg: "var(--space-6)",
  xl: "var(--space-10)"
};

export function Stack({ children, gap = "md" }) {
  return (
    <div style={{ display: "grid", gap: gapMap[gap] ?? gapMap.md }}>
      {children}
    </div>
  );
}
