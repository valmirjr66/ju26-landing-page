import NotFound from "@/pages/NotFound";
import { useTheme } from "next-themes";
import { Toaster, type ToasterProps } from "sonner";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { theme = "system" } = useTheme();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <Toaster
          theme={theme as ToasterProps["theme"]}
          className="toaster group"
          style={
            {
              "--normal-bg": "var(--popover)",
              "--normal-text": "var(--popover-foreground)",
              "--normal-border": "var(--border)",
            } as React.CSSProperties
          }
        />
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
