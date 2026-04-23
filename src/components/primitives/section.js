export function Section({ children, width = "admin" }) {
  const className = width === "public" ? "section public-width" : "section admin-width";

  return <section className={className}>{children}</section>;
}
