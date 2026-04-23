export function Surface({ children, padded = false, className = "", style }) {
  const classes = ["surface", padded ? "surface-padded" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
