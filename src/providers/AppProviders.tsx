'use client';

import { UIProvider } from "@/context/UIContext";
import { UserProvider } from "@/context/UserContext";


export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <UIProvider>
        {children}
      </UIProvider>
    </UserProvider>
  );
};
