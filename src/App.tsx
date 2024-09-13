import { ThemeProvider } from "./components/ThemeProvider";
import { AuthPage } from "./components/AuthPage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthPage />
    </ThemeProvider>
  );
}

export default App;
