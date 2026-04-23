import { AppShell } from "@/components/layout/app-shell";
import { Surface } from "@/components/primitives/surface";
import { Stack } from "@/components/primitives/stack";

export default function NotFound() {
  return (
    <AppShell>
      <Surface padded>
        <Stack gap="md">
          <p className="eyebrow">Not Found</p>
          <h1 className="section-title">This route is outside the current Phase 1 scope.</h1>
          <p className="body-text">
            Valid public examples follow the structure <strong>/restaurant/lang</strong>,
            <strong> /restaurant/en</strong>, or <strong>/restaurant/ru</strong>.
          </p>
        </Stack>
      </Surface>
    </AppShell>
  );
}
