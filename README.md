# QR Menu Platform

Phase 1 through Phase 4 foundation for a QR menu platform with a host-based admin app, restaurant-specific public routes, a typed content schema, minimal admin authentication, and a calm admin dashboard shell.

## Architecture

- `admin.domain.com` is handled through `middleware.js` and rewritten to `/admin`.
- Public restaurant routes live under:
  - `/:restaurant/lang`
  - `/:restaurant/en`
  - `/:restaurant/ru`
- Shared design tokens, typography, and layout primitives live in `src/app/globals.css`, `src/styles/layouts.css`, and `src/components/primitives`.

## Structure

```text
src/
  app/
    admin/
      (protected)/
        categories/page.js
        layout.js
        page.js
        products/page.js
        settings/page.js
      login/page.js
    [restaurant]/lang/page.js
    [restaurant]/[locale]/page.js
    globals.css
    layout.js
  components/
    admin/
    layout/
    primitives/
    public/
  data/
    repositories.ts
    seed.ts
  lib/
    admin-auth.ts
    admin-password.ts
    admin-session.ts
    site-config.js
  types/
    content.ts
  styles/
    layouts.css
middleware.js
```

## Data Model

- `User`
  - `id`
  - `username`
  - `passwordHash`
  - `restaurantId`
- `Restaurant`
  - `id`
  - `name`
  - `slug`
  - `logo`
  - `coverImage?`
  - `status`
- `Category`
  - `id`
  - `restaurantId`
  - `image`
  - `sortOrder`
  - `title.en`
  - `title.ru`
- `Product`
  - `id`
  - `restaurantId`
  - `categoryId`
  - `image`
  - `price`
  - `sortOrder`
  - `title.en`
  - `title.ru`
  - `description.en`
  - `description.ru`

## Relationship Structure

- One `User` manages one `Restaurant` through `restaurantId`.
- One `Restaurant` owns many `Category` records through `category.restaurantId`.
- One `Category` owns many `Product` records through `product.categoryId`.
- Public menu localization is constrained to `en` and `ru` via `SUPPORTED_PUBLIC_LOCALES`.

## Data Flow

- Admin reads `AdminScope` from `src/data/repositories.ts`, scoped by authenticated `username`, then writes changes against that user's single linked restaurant.
- Public menu resolves a restaurant from the route slug, loads its categories and products through `getRestaurantContentBySlug`, and selects `en` or `ru` fields at render time.
- `src/data/seed.ts` is the current development source of truth and mirrors the shape expected from a future database or API layer.

## Admin Authentication

- Admin entry is `admin.domain.com` in production and `/admin/login` in local path-based development.
- Login is username and password only.
- Sessions are stored in an `httpOnly` cookie signed with HMAC in `src/lib/admin-session.ts`.
- Protected admin routes are enforced in `middleware.ts`.
- Logout clears the session cookie and returns to the login screen.

## Admin Dashboard Shell

- Post-login admin routes are organized into:
  - `/admin`
  - `/admin/categories`
  - `/admin/products`
  - `/admin/settings`
- A shared admin layout provides active navigation states and a responsive two-column shell.
- Overview includes restaurant name, public language-entry URL preview, total categories, and total products.
- Categories, Products, and Settings are intentionally shell pages only.

## Category Management

- `/admin/categories` now includes:
  - category list with image thumbnail, English title, Russian title, and sort order
  - create and edit form with validation
  - delete flow
  - move up and move down ordering controls
  - empty state when no categories exist
- Category images can be selected from a preset library or uploaded directly for the current runtime session.

## Product Management

- `/admin/products` now includes:
  - product list with image, English title, Russian title, description preview, price, and linked category
  - create and edit form with bilingual content fields
  - category assignment
  - delete flow
  - move up and move down ordering controls
  - validation and empty states
- Product images can be selected from a preset library or uploaded directly for the current runtime session.

## Restaurant Settings

- `/admin/settings` now includes:
  - restaurant name
  - slug
  - public URL preview for `/lang`, `/en`, and `/ru`
  - logo upload or preset selection
  - optional cover image upload or preset selection
  - active or inactive toggle
- Settings save into the current runtime store and refresh the related admin and public routes.

### Seed Credentials

- Username: `atelier.moscow`
- Password: `atelier123`

## Local Development

```bash
pnpm dev
```

For local admin testing, open the public app at `http://localhost:3000/<restaurant>/lang`.

To simulate the admin host locally, map a local host such as `admin.localhost:3000`.
