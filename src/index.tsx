import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "../tailwind-input.css";
import App from "./App";
import Resume from "./components/Resume";
import CoverLetter from "./components/CoverLetter";

// Storage key for redirect path
const REDIRECT_KEY = 'gh-pages-redirect';

// Component to handle 404 redirects from GitHub Pages
interface RedirectHandlerProps {
  children: React.ReactNode;
}

function RedirectHandler({ children }: RedirectHandlerProps) {
  const navigate = useNavigate();

  React.useEffect(() => {
    const redirect = sessionStorage.getItem(REDIRECT_KEY);
    if (redirect !== null) {
      sessionStorage.removeItem(REDIRECT_KEY);
      // Use replace to avoid adding index route to history
      navigate(redirect, { replace: true });
    }
    // navigate is stable from useNavigate and won't cause re-renders
  }, [navigate]);

  return <>{children}</>;
}

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RedirectHandler>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/cover-letter" element={<CoverLetter />} />
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </RedirectHandler>
    </BrowserRouter>
  </React.StrictMode>
);
