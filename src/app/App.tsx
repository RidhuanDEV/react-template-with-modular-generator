import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { LoadingOverlay } from "@/components/feedback";
import { AppProviders } from "./providers";
import { router } from "./router";

const App = () => {
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
