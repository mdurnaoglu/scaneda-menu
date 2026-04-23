import { Surface } from "@/components/primitives/surface";
import { Stack } from "@/components/primitives/stack";

export function AdminSectionShell({ eyebrow, title, description, children }) {
  return (
    <Stack gap="lg">
      <Stack gap="sm">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="section-title">{title}</h1>
        <p className="body-text">{description}</p>
      </Stack>

      {children ? (
        children
      ) : (
        <Surface padded>
          <Stack gap="sm">
            <h2 className="card-title">{title}</h2>
            <p className="body-text">This section is intentionally a clean shell for the next phase.</p>
          </Stack>
        </Surface>
      )}
    </Stack>
  );
}
