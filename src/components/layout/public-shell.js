import { AppShell } from "@/components/layout/app-shell";
import { Section } from "@/components/primitives/section";
import { Surface } from "@/components/primitives/surface";
import { Stack } from "@/components/primitives/stack";

export function PublicShell({ eyebrow, title, description, children, className = "", style }) {
  return (
    <AppShell>
      <Section width="public">
        <Surface padded className={`public-stage ${className}`.trim()} style={style}>
          <Stack gap="lg">
            <div className="public-header">
              <Stack gap="sm">
                {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
                <h1 className="section-title public-title">{title}</h1>
                {description ? <p className="body-text public-description">{description}</p> : null}
              </Stack>
            </div>
            {children}
          </Stack>
        </Surface>
      </Section>
    </AppShell>
  );
}
