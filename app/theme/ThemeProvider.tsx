
"use client";


import {ThemeProvider as NextThemesProvider} from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";


interface MyThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode;
}
export function ThemeProvider({children}: MyThemeProviderProps) {
  return (
    
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
   
  )
}