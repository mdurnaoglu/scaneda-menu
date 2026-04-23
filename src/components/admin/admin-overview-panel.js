import { Surface } from "@/components/primitives/surface";
import { Stack } from "@/components/primitives/stack";

export function AdminOverviewPanel({ restaurantName, publicEntryUrl, categoryCount, productCount }) {
  return (
    <Stack gap="lg">
      <div className="admin-summary-grid">
        <Surface padded>
          <Stack gap="sm">
            <p className="caption-text">Restaurant</p>
            <h2 className="card-title">{restaurantName}</h2>
            <p className="body-text">Primary restaurant identity connected to this account.</p>
          </Stack>
        </Surface>

        <Surface padded>
          <Stack gap="sm">
            <p className="caption-text">Total Categories</p>
            <h2 className="card-title">{categoryCount}</h2>
            <p className="body-text">Ordered groups used to structure the public menu.</p>
          </Stack>
        </Surface>

        <Surface padded>
          <Stack gap="sm">
            <p className="caption-text">Total Products</p>
            <h2 className="card-title">{productCount}</h2>
            <p className="body-text">Current bilingual products attached to restaurant content.</p>
          </Stack>
        </Surface>
      </div>

      <Surface padded>
        <Stack gap="sm">
          <p className="caption-text">Public Language Entry</p>
          <h2 className="card-title">Menu entry URL</h2>
          <p className="admin-url-preview">{publicEntryUrl}</p>
          <p className="body-text">
            Guests enter here first, then continue into English or Russian menu pages.
          </p>
        </Stack>
      </Surface>
    </Stack>
  );
}
