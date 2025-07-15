// import { Footer, Header, Sidebar } from "@app/_components/layout";
// import { getMenus } from "@app/_components/layout/Sidebar/menus-items";
// import { Customizer, CustomizerButton } from "@app/_shared";
// import {
//   JumboLayout,
//   JumboLayoutProvider,
// } from "@jumbo/components/JumboLayout";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { defaultLayoutConfig } from "@app/_config/layouts";

// export function StretchedLayout() {
//   const location = useLocation();
//   const menus = getMenus();
//   return (
//     <JumboLayoutProvider layoutConfig={defaultLayoutConfig}>
//       <JumboLayout
//         header={<Header />}
//         footer={<Footer />}
//         sidebar={<Sidebar menus={menus} />}
//       >
//         {location.pathname === "/" && <Navigate to={"/admin-dashboard/all-tickets"} />}
//         <Outlet />
//         <Customizer />
//         <CustomizerButton />
//       </JumboLayout>
//     </JumboLayoutProvider>
//   );
// }





import { Footer, Header, Sidebar } from "@app/_components/layout";
import { getMenus } from "@app/_components/layout/Sidebar/menus-items";
import { Customizer, CustomizerButton } from "@app/_shared";
import {
  JumboLayout,
  JumboLayoutProvider,
} from "@jumbo/components/JumboLayout";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { defaultLayoutConfig } from "@app/_config/layouts";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";

export function StretchedLayout() {
  const location = useLocation();
  const menus = getMenus();
  const { loggedInUser } = useAuth();

  let defaultRoute = null;
  if (loggedInUser?.role === "admin") defaultRoute = "/admin-dashboard/overview";
  else if (loggedInUser?.role === "employee") defaultRoute = "/employee-dashboard/overview";
  else if (loggedInUser?.role === "support") defaultRoute = "/support-agent-dashboard/overview";

  return (
    <JumboLayoutProvider layoutConfig={defaultLayoutConfig}>
      <JumboLayout
        header={<Header />}
        footer={<Footer />}
        sidebar={<Sidebar menus={menus} />}
      >
        {location.pathname === "/" && defaultRoute && <Navigate to={defaultRoute} />}
        <Outlet />
        <Customizer />
        <CustomizerButton />
      </JumboLayout>
    </JumboLayoutProvider>
  );
}