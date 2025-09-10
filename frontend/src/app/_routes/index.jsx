import { Page } from "@app/_components/_core";
import {
  ActiveLogin,
  AdvertisingSettings,
  EmailAccessSettings,
  InvoiceSettings,
  MembershipPlans,
  NotificationSettings,
  OrganizationSettings,
  PaymentMethodSettings,
  ResetPasswordSettings,
  StatementSettings,
  TeamSettings,
  TwoFactorAuth,
} from "@app/_components/user/settings";
import withAuth from "@app/_hoc/withAuth";
import { SettingsLayout } from "@app/_layouts/SettingsLayout";
import { SoloLayout } from "@app/_layouts/SoloLayout";
import { StretchedLayout } from "@app/_layouts/StretchedLayout";
import ChatAppPage from "@app/pages/apps/chat";
import ContactAppPage from "@app/pages/apps/contact";
import InvoicePage1 from "@app/pages/apps/invoice-1";
import MailAppPage from "@app/pages/apps/mail";
import ForgotPassword from "@app/pages/auth/forgot-password";
import Login1 from "@app/pages/auth/login1";
import Login2 from "@app/pages/auth/login2";
import ResetPassword from "@app/pages/auth/reset-password";
import Signup1 from "@app/pages/auth/signup1";
import Signup2 from "@app/pages/auth/signup2";
import SamplePage from "@app/pages/dashboards/sample";
import DnDPage from "@app/pages/extensions/dnd";
import DropzonePage from "@app/pages/extensions/dropzone";
import CkEditorPage from "@app/pages/extensions/editors/ck";
import WysiwygEditorPage from "@app/pages/extensions/editors/wysiwyg";
import SweetAlertsPage from "@app/pages/extensions/sweet-alert";
import NotFoundErrorPage from "@app/pages/extra-pages/404";
import InternalServerErrorPage from "@app/pages/extra-pages/500";
import AboutUsPage from "@app/pages/extra-pages/about-us";
import CallOutsPage from "@app/pages/extra-pages/call-outs";
import ContactUsPage from "@app/pages/extra-pages/contact-us";
import LockScreenPage from "@app/pages/extra-pages/lock-screen";
import PricingPlanPage from "@app/pages/extra-pages/pricing-plan";
import ProjectsGridPage from "@app/pages/grid-views/projects";
import UsersGridPage from "@app/pages/grid-views/users";
import ProjectsListPage from "@app/pages/list-views/projects";
import UsersListPage from "@app/pages/list-views/users";
import MetricsPage from "@app/pages/metrics";
import BasicCalendarPage from "@app/pages/modules/calendars/basic";
import CultureCalendarPage from "@app/pages/modules/calendars/culture";
import PopupCalendarPage from "@app/pages/modules/calendars/popup";
import RenderingCalendarPage from "@app/pages/modules/calendars/rendering";
import SelectableCalendarPage from "@app/pages/modules/calendars/selectable";
import TimeslotCalendarPage from "@app/pages/modules/calendars/timeslot";
import AreaChartPage from "@app/pages/modules/charts/area";
import BarChartPage from "@app/pages/modules/charts/bar";
import ComposedChartPage from "@app/pages/modules/charts/composed";
import LineChartPage from "@app/pages/modules/charts/line";
import PieChartPage from "@app/pages/modules/charts/pie";
import RadarChartPage from "@app/pages/modules/charts/radar";
import RadialChartPage from "@app/pages/modules/charts/radial";
import ScatterChartPage from "@app/pages/modules/charts/scatter";
import TreeMapChartPage from "@app/pages/modules/charts/treemap";
import MarkerClustererPage from "@app/pages/modules/maps/clustering";
import DirectionsMapPage from "@app/pages/modules/maps/directions";
import DrawingViewMapPage from "@app/pages/modules/maps/drawing";
import GeoLocationMapPage from "@app/pages/modules/maps/geo-location";
import KmLayerMapPage from "@app/pages/modules/maps/kml";
import OverlayMapPage from "@app/pages/modules/maps/overlay";
import PopupInfoMapPage from "@app/pages/modules/maps/popup-info";
import SimpleMapPage from "@app/pages/modules/maps/simple";
import StreetViewPanoramaPage from "@app/pages/modules/maps/street-view";
import StyledMapPage from "@app/pages/modules/maps/styled";
import OnboardingPage1 from "@app/pages/onboarding-1";
import OnboardingPage2 from "@app/pages/onboarding-2";
import OnboardingPage3 from "@app/pages/onboarding-3";
import UserProfile1 from "@app/pages/user/profile-1";
import ProfilePage2 from "@app/pages/user/profile-2";
import ProfilePage3 from "@app/pages/user/profile-3";
import ProfilePage4 from "@app/pages/user/profile-4";
import PublicProfile from "@app/pages/user/settings/public-profile";
import ChangePassword from "@app/pages/user/settings/change-password";
import EditProfile from "@app/pages/user/settings/edit-profile";
import SocialWallApp from "@app/pages/user/social-wall";
import { WidgetsPage } from "@app/pages/widgets";
import { createBrowserRouter } from "react-router-dom";
import NewPage from "@app/pages/dashboards/newpage";   // Import New Page
import UserPage from "@app/pages/admin/users";
import AssignTicketPage from "@app/pages/admin/Assign Tickets";
// import SearchFilterPage from "@app/pages/admin/Filter & Search";
// import AllTicketsPage from "@app/pages/admin/all-tickets/page";
import AgentsPage from "@app/pages/admin/Support Agents";
import OverviewPage from "@app/pages/admin/overview";
import TicketDetailsPage from "@app/pages/admin/tickets/[ticketId]";
import EmployeeOverviewPage from "@app/pages/employee/overview";
import MyTicketsPage from "@app/pages/employee/tickets";
import TicketDetailEmployee from "@app/pages/employee/tickets/[ticketId]";
import CreateTicketPage from "@app/pages/employee/createTickets";
import AgentOverviewPage from "@app/pages/support-agent/overview";
import AssignedTicketsPage from "@app/pages/support-agent/assigned-tickets";
import TicketDetailAgentPage from "@app/pages/support-agent/assigned-tickets/[ticketId]";
import FilteringAndSearchingPage from "@app/pages/support-agent/filter&search";
import TicketDetailPage from "@app/pages/employee/tickets/[ticketId]";
import FilterTicketDetailPage from "@app/pages/support-agent/filter&search/[ticketId]";
import AllTicketDetailsPage from "@app/pages/admin/tickets/[ticketId]";
import SearchAndFilterPage from "@app/pages/admin/tickets";

const routes = [
  {
    path: "/",
    element: <StretchedLayout />,
    children: [

        {
        path: "",
        element: <Page Component={OverviewPage} hoc={withAuth} />,
      },
      // routes for admin dashboard
      {
        path: "/admin-dashboard/overview",
        element: <Page Component={OverviewPage} hoc={withAuth} />,
      },
      {
        path: "/admin-dashboard/tickets",
        element: <Page Component={SearchAndFilterPage} hoc={withAuth} />,
      },
      {
        path: "/admin-dashboard/tickets/:ticketId",
        element: <Page Component={AllTicketDetailsPage} hoc={withAuth} />,
      },
      {
        path: "/admin-dashboard/assign-tickets",
        element: <Page Component={AssignTicketPage} hoc={withAuth} />,
      },
      // {
      //   path: "/admin-dashboard/filter&search",
      //   element: <Page Component={SearchFilterPage} hoc={withAuth} />,
      // },
      {
        path: "/admin-dashboard/support-agents",
        element: <Page Component={AgentsPage} hoc={withAuth} />,
      },
      {
        path: "/admin-dashboard/users",
        element: <Page Component={UserPage} hoc={withAuth} />,
      },
      // {
      //   path: "/admin-dashboard/all-tickets/:ticketId",
      //   element: <Page Component={TicketDetailsPage} hoc={withAuth} />,
      // },



      // .
      {
        path: "/admin-dashboard/sample",
        element: <Page Component={SamplePage} hoc={withAuth} />,
      },
      {          // New Page
        path: "/dashboards/newpage",
        element: <Page Component={NewPage} hoc={withAuth} />,
      },
      // Profile Settings Routes
      {
        path: "/user/settings/change-password",
        element: <Page Component={ChangePassword} hoc={withAuth} />,
      },
      {
        path: "/user/settings/edit-profile",
        element: <Page Component={EditProfile} hoc={withAuth} />,
      },
      {
        path: "/user/profile-1",
        element: <Page Component={UserProfile1} hoc={withAuth} />,
      },

      // employee dashboard routes
      {
        path: "employee-dashboard/overview",
        element: <Page Component={EmployeeOverviewPage} hoc={withAuth} />,
      },
      {
        path: "/employee-dashboard/tickets",
        element: <Page Component={MyTicketsPage} hoc={withAuth} />,
      },
      {
        path: "/employee-dashboard/tickets/:ticketId",
        element: <Page Component={TicketDetailEmployee} hoc={withAuth} />,
      },
      {
        path: "/employee-dashboard/create-tickets",
        element: <Page Component={CreateTicketPage} hoc={withAuth} />,
      },


      // Support Agent routes 
      {
        path: "/support-agent-dashboard/overview",
        element: <Page Component={AgentOverviewPage} hoc={withAuth} />,
      },
      {
        path: "/support-agent-dashboard/assigned-tickets",
        element: <Page Component={AssignedTicketsPage} hoc={withAuth} />,
      },
      {
        path: "/support-agent-dashboard/assigned-tickets/:ticketId",
        element: <Page Component={TicketDetailAgentPage} hoc={withAuth} />,
      },
      // {
      //   path: "/support-agent-dashboard/filter&search",
      //   element: <Page Component={FilteringAndSearchingPage} hoc={withAuth} />,
      // },
      // {
      //   path: "/support-agent-dashboard/filter&search/:ticketId",
      //   element: <Page Component={FilterTicketDetailPage} hoc={withAuth} />,
      // },
    ],
  },

  {
    path: "/auth",
    element: <SoloLayout />,
    children: [
      {
        path: "login",
        element: <Login1 />,
      },
      // {
      //   path: "login-2",
      //   element: <Login2 />,
      // },
      // {
      //   path: "signup-1",
      //   element: <Signup1 />,
      // },
      // {
      //   path: "signup-2",
      //   element: <Signup2 />,
      // },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/extra-pages",
    element: <SoloLayout />,
    children: [
      {
        path: "404",
        element: <NotFoundErrorPage />,
      },
      {
        path: "500",
        element: <InternalServerErrorPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundErrorPage />,
  },
];

export const router = createBrowserRouter(routes);
