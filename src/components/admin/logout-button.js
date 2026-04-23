import { logoutAdmin } from "@/app/admin/actions";

export function LogoutButton() {
  return (
    <form action={logoutAdmin}>
      <button className="logout-button" type="submit">
        Logout
      </button>
    </form>
  );
}
