"use client";

import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import { setLanguage } from "./languageSlice";

interface ProvidersProps {
  children: React.ReactNode;
}

function HtmlUpdater() {
  const lang = useSelector((state: any) => state.locale.lang);
  const dir = useSelector((state: any) => state.locale.dir);

  useEffect(() => {
    // Set default values if not already set
    if (!lang) store.dispatch(setLanguage("en"));
  }, [lang]);

  useEffect(() => {
    if (lang) document.documentElement.lang = lang;
    if (dir) document.documentElement.dir = dir ?? "ltr";
  }, [lang, dir]);

  return null; // no UI rendered
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <HtmlUpdater />
      {children}
    </Provider>
  );
}
