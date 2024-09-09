import { ThemeProvider } from "./components/ThemeProvider";
import { StudentDashboard } from "./components/StudentDashboard";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <StudentDashboard />
    </ThemeProvider>
  );
}

export default App;
