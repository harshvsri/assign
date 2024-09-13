import { ThemeProvider } from "./components/ThemeProvider";
import CodeWorkspace from "./components/CodeWorkspace";
import { problem } from "./lib/data";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CodeWorkspace problem={problem} />
    </ThemeProvider>
  );
}

export default App;
