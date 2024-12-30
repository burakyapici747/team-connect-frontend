'use client';

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/lib/theme";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";

interface ClientProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const ClientProviders = ({ children }: ClientProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}; 