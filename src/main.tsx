import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./config/queryClient";
import App from "./App";
import "./index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            {/* Devtools will only open/render during local development */}
            <ReactQueryDevtools initialIsOpen={false} position="bottom" />
            <Toaster />
        </QueryClientProvider>
    </React.StrictMode>,
);
