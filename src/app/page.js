import { AppShell } from "@/components/layout/app-shell";
import { Surface } from "@/components/primitives/surface";
import { Stack } from "@/components/primitives/stack";

export default function HomePage() {
  return (
    <AppShell>
      <Surface padded>
        <Stack gap="lg">
          <p className="eyebrow">Project Foundation</p>
          <h1 className="display-title">QR menu platform architecture is ready.</h1>
          <p className="body-text">
            Public routes live under <strong>/restaurantname/lang</strong> and
            localized menu shells under <strong>/restaurantname/en</strong> and
            <strong> /restaurantname/ru</strong>. Admin is isolated through the
            <strong> admin.scaneda.online</strong> host rewrite.
          </p>
        </Stack>
      </Surface>
    </AppShell>
  );
}
