import { useOnboarding } from "@app/_components/onboarding";
import { Onboarding1Sidebar } from "@app/_components/onboarding/onboarding-1";
import { ContentLayout } from "@app/_layouts";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import React from "react";

const useOnboarding1Config = () => {
  const { theme } = useJumboTheme();

  return React.useMemo(
    () => ({
      sidebarOptions: {
        sx: {
          display: { xs: "none", lg: "flex" },
          minWidth: 0,
          flexShrink: 0,
          flexDirection: "column",
          width: 300,
          minHeight: "100%",
          border: 1,
          borderColor: (theme) => theme.palette.divider,
          background:
            theme.type === "light" || theme.type === "semi-dark"
              ? `url(${ASSET_IMAGES}/payment-bg.png) no-repeat center bottom`
              : (theme) => theme.palette.background.paper,

          backgroundSize: "cover",
          borderRadius: 3,
          mr: 3,
          p: 3,
        },
      },
      wrapperOptions: {
        sx: {
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
          },
        },
        container: true,
      },
      contentOptions: {
        sx: {
          p: { lg: 0, xs: 0 },
        },
      },
    }),
    [theme]
  );
};
const Onboarding1Config = () => {
  const onboardingLayoutOptions = useOnboarding1Config();

  const { activeStep } = useOnboarding();

  const ContentComponent = React.useMemo(
    () => activeStep?.component,
    [activeStep]
  );

  return (
    <ContentLayout
      sidebar={<Onboarding1Sidebar />}
      {...onboardingLayoutOptions}
    >
      <ContentComponent value={activeStep} />
    </ContentLayout>
  );
};

export { Onboarding1Config };
