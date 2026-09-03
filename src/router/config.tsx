import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import OwnerLogin from "../pages/owner/login/page";
import OwnerOTPSetup from "../pages/owner/otp-setup/page";
import OwnerDashboard from "../pages/owner/dashboard/page";
import OwnerMembers from "../pages/owner/members/page";
import OwnerVerification from "../pages/owner/verification/page";
import OwnerReports from "../pages/owner/reports/page";
import OwnerAIAgents from "../pages/owner/ai-agents/page";
import OwnerSystemHealth from "../pages/owner/system-health/page";
import OwnerSettings from "../pages/owner/settings/page";
import { OwnerRoute } from "../components/feature/OwnerRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/owner/login",
    element: <OwnerLogin />,
  },
  {
    path: "/owner/otp-setup",
    element: <OwnerOTPSetup />,
  },
  {
    path: "/owner/dashboard",
    element: (
      <OwnerRoute>
        <OwnerDashboard />
      </OwnerRoute>
    ),
  },
  {
    path: "/owner/members",
    element: (
      <OwnerRoute>
        <OwnerMembers />
      </OwnerRoute>
    ),
  },
  {
    path: "/owner/verification",
    element: (
      <OwnerRoute>
        <OwnerVerification />
      </OwnerRoute>
    ),
  },
  {
    path: "/owner/reports",
    element: (
      <OwnerRoute>
        <OwnerReports />
      </OwnerRoute>
    ),
  },
  {
    path: "/owner/ai-agents",
    element: (
      <OwnerRoute>
        <OwnerAIAgents />
      </OwnerRoute>
    ),
  },
  {
    path: "/owner/system-health",
    element: (
      <OwnerRoute>
        <OwnerSystemHealth />
      </OwnerRoute>
    ),
  },
  {
    path: "/owner/settings",
    element: (
      <OwnerRoute>
        <OwnerSettings />
      </OwnerRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;