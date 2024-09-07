import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import Spinner from "@/components/Spinner";
import Example from "./Example";
import { ResultDialog } from "./ResultDialog";

interface CodeEditorProps {
  problem: {
    title: string;
    description: string;
    difficulty: string;
    examples: {
      input: string;
      output: string;
      explanation: string;
    }[];
  };
}

export function CodeEditor({ problem }: CodeEditorProps) {
  const [code, setCode] = useState("// Write your code here");
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      source_code: code,
      language_id: 63,
      stdin: "3\n1 3 5",
      expected_output: "9",
    };
    const res = await fetch("http://localhost:2358/submissions/?wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    setLoading(false);
    setResult(result);
    setOpen(true);
    console.log(result);
  };

  return (
    <div className="h-screen w-full" style={{ backgroundColor: "#1e1e1e" }}>
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
          <div className="h-full p-4 text-gray-200 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {problem.title}
              <Badge variant="outline" className="ml-2 text-green-500">
                {problem.difficulty}
              </Badge>
            </h2>
            <p className="text-gray-300">{problem.description}</p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Examples:</h3>
            {problem.examples.map((example, index) => (
              <Example example={example} key={index} />
            ))}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={90}>
              <Editor
                height="100%"
                defaultLanguage="javascript"
                defaultValue={code}
                onChange={(value) => {
                  setCode(value || "");
                }}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 18,
                  lineNumbers: "on",
                  automaticLayout: true,
                  wordWrap: "on",
                }}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={10} maxSize={20}>
              <div
                className="h-full p-4 flex flex-col justify-end space-y-4"
                style={{ backgroundColor: "#1e1e1e" }}
              >
                <div className="flex justify-end space-x-4">
                  <Button
                    variant="default"
                    className="text-white bg-[#3a3a3a] hover:bg-[#4a4a4a]"
                  >
                    Run
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="text-white  bg-green-600 hover:bg-green-700"
                  >
                    {loading ? <Spinner /> : "Submit"}
                  </Button>
                  <ResultDialog
                    result={result}
                    open={open}
                    onOpenChange={setOpen}
                  />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
