import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { Spinner } from "@/components/Icons";
import { ResultDialog } from "./RunDialog";
import { SubmitResultDialog } from "./SubmitDialog";
import { Problem } from "@/lib/types";
import ExampleTile from "./ExampleTile";

interface CodeEditorProps {
  problem: Problem;
}

export function CodeEditor({ problem }: CodeEditorProps) {
  const [code, setCode] = useState(problem.starterCode);
  const [runResult, setRunResult] = useState(null);
  const [openRunDialog, setOpenRunDialog] = useState(false);
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleRun = async () => {
    setRunLoading(true);
    const testCase = problem.testCases[0];
    const payload = {
      source_code: code,
      language_id: 63,
      stdin: testCase.input,
      expected_output: testCase.expectedOutput,
    };
    const res = await fetch("http://localhost:2358/submissions/?wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    setRunLoading(false);
    setRunResult(result);
    setOpenRunDialog(true);
    console.log(result);
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    const testResults = await Promise.all(
      problem.testCases.map(async (testCase, index) => {
        const payload = {
          source_code: code,
          language_id: 63, // JavaScript
          stdin: testCase.input,
          expected_output: testCase.expectedOutput,
        };
        const res = await fetch(
          "http://localhost:2358/submissions/?wait=true",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const result = await res.json();
        return { ...result, testCaseIndex: index };
      })
    );
    setSubmitLoading(false);
    setSubmitResult(testResults);
    setOpenSubmitDialog(true);
    console.log(testResults);
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
              <ExampleTile example={example} key={index} />
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
            <ResizablePanel defaultSize={10} minSize={10} maxSize={20}>
              <div
                className="h-full p-4 flex flex-col justify-end space-y-4"
                style={{ backgroundColor: "#1e1e1e" }}
              >
                <div className="flex justify-end space-x-4">
                  <Button
                    onClick={handleRun}
                    variant="default"
                    className="text-white bg-[#3a3a3a] hover:bg-[#4a4a4a]"
                  >
                    {runLoading ? <Spinner /> : "Run"}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="text-white  bg-green-600 hover:bg-green-700"
                  >
                    {submitLoading ? <Spinner /> : "Submit"}
                  </Button>
                  <ResultDialog
                    testCase={problem.testCases[0]}
                    result={runResult}
                    open={openRunDialog}
                    onOpenChange={setOpenRunDialog}
                  />
                  <SubmitResultDialog
                    testCases={problem.testCases}
                    results={submitResult}
                    open={openSubmitDialog}
                    onOpenChange={setOpenSubmitDialog}
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
