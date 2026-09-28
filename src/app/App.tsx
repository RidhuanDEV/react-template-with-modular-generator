import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { LoadingOverlay } from "@/components/feedback";
import { APP_NAME } from "@/config/constants";
import { AppProviders } from "./providers";
import { router } from "./router";

const App = () => {
  useEffect(() => {
    document.title = APP_NAME;
  }, []);

  return (
    <AppProviders>
      <Suspense
        fallback={<LoadingOverlay visible message="Loading application..." />}
      >
        <RouterProvider router={router} />
      </Suspense>
    </AppProviders>
  );
};

export default App;
