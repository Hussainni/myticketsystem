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
      // {
      //   path: "/admin-dashboard/all-tickets",
      //   label: t("All Tickets"),
      //   icon: "settings",
      // },
      {
        path: "/admin-dashboard/tickets",
        label: t("All Tickets"),
        icon: "settings",
      },
      {
        path: "/admin-dashboard/assign-tickets",
        label: t("Assign Tickets"),
        icon: "settings",
      },
      // {
      //   path: "/admin-dashboard/support-agents",
      //   label: t("Support Agents"),
      //   icon: "settings",
      // },
      {
        path: "/admin-dashboard/users",
        label: t("Users"),
        icon: "settings"
      },
    ];
  } else if (loggedInUser?.role === "employee") {
    menuItems = [
      {
        path: "/employee-dashboard/overview",
        label: t("Overview"),
        icon: "settings",
      },
      {
        path: "/employee-dashboard/tickets",
        label: t("My Tickets"),
        icon: "settings",
      },
      {
        path: "/employee-dashboard/create-tickets",
        label: t("Create Ticket"),
        icon: "settings",
      },
    ];
  } else if (loggedInUser?.role === "support") {
    menuItems = [
       {
        path: "/support-agent-dashboard/overview",
        label: t("Overview"),
        icon: "settings",
      },
      // {
      //   path: "/support-agent-dashboard/filter&search",
      //   label: t("Filters & Search"),
      //   icon: "settings",
      // },
      {
        path: "/support-agent-dashboard/assigned-tickets",
        label: t("Assigned Tickets"),
        icon: "settings",
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



