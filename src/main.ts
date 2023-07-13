import "@candy-doc/ui/src/components/Button/Button";
import "@candy-doc/ui/src/components/Sidebar/Element";
import "@candy-doc/ui/src/components/Accordion";
import "@candy-doc/ui/src/components/Sidebar";
import "@candy-doc/ui/src/components/SidebarDoc";
import "@candy-doc/ui/src/components/SidebarDoc/DocElement";
import "@candy-doc/ui/src/components/SidebarDoc/DocTitle";
import "@candy-doc/ui/src/components/FloatingButton";
import "@candy-doc/ui/src/components/Input";

import App from "./App.svelte";
import "./styles/tailwind.css";
import "./styles/main.css";

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
