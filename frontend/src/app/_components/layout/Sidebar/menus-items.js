import { useTranslation } from "react-i18next";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import GroupIcon from '@mui/icons-material/Group';
export function getMenus() {
  const { t } = useTranslation();
  const { loggedInUser } = useAuth();

  let menuItems = [];

  if (loggedInUser?.role === "admin") {
    menuItems = [
         {
        path: "/admin-dashboard/overview",
        label: t("Overview"),
        icon: "settings",
      },
      {
        path: "/admin-dashboard/all-tickets",
        label: t("All Tickets"),
        icon: "settings",
      },
      {
        path: "/admin-dashboard/filter&search",
        label: t("Filter & search"),
        icon: "settings",
      },
      {
        path: "/admin-dashboard/assign-tickets",
        label: t("Assign Tickets"),
        icon: "settings",
      },
      {
        path: "/admin-dashboard/support-agents",
        label: t("Support Agents"),
        icon: "settings",
      },
      {
        path: "/admin-dashboard/users",
        label: t("Users"),
        icon: "settings"
      },
    ];
  } else if (loggedInUser?.role === "employee") {
    menuItems = [
      {
        path: "/tickets/my",
        label: t("My Tickets"),
        icon: "confirmation_number",
      },
      {
        path: "/tickets/create",
        label: t("Create Ticket"),
        icon: "add_circle",
      },
    ];
  } else if (loggedInUser?.role === "support") {
    menuItems = [
      {
        path: "/tickets/assigned",
        label: t("Assigned Tickets"),
        icon: "assignment_ind",
      },
      {
        path: "/tickets/all",
        label: t("All Tickets"),
        icon: "confirmation_number",
      },
    ];
  }

  return [
    {
      label: t("sidebar.menu.home"),
      children: menuItems,
    },
  ];
}



 