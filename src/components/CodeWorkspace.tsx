import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Problem } from "@/lib/types";
import ProblemDescription from "./ProblemDescription";
import CodeEditor from "./CodeEditor";
import CodeActions from "./CodeActions";

interface CodeWorkspaceProps {
  problem: Problem;
}

function CodeWorkspace({ problem }: CodeWorkspaceProps) {
  const [code, setCode] = useState(problem.starterCode);

  return (
    <div className="h-screen w-full" style={{ backgroundColor: "#1e1e1e" }}>
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
          <ProblemDescription problem={problem} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={90}>
              <CodeEditor code={code} setCode={setCode} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={10} minSize={10} maxSize={20}>
              <CodeActions problem={problem} code={code} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default CodeWorkspace;