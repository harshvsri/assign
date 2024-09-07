import { CodeEditor } from "./components/CodeEditor";
import { problem } from "./lib/data";

function App() {
  return (
    <>
      <CodeEditor problem={problem} />
    </>
  );
}

export default App;
