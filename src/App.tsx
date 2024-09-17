import { ThemeProvider } from "./components/ThemeProvider";
import AuthProvider from "react-auth-kit";
import { store } from "./lib/store";
import RouteComponent from "./components/RouteComponent";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider store={store}>
        <RouteComponent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
