import { Helmet, HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster.tsx";
import { router } from "@/routes";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Helmet>
          <title>Wibu Watch</title>
        </Helmet>
        <Toaster />
        <RouterProvider router={router} />
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
