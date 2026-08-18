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
              "--normal-bg": "#ffffff",
              "--normal-text": "#000000",
              "--normal-border": "#e0e0e0",
            } as React.CSSProperties
          }
        />
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
