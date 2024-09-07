import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";

export function CodeEditor() {
  const [code, setCode] = useState("// Write your code here");

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleRun = () => {
    console.log("Run code");
    // Implement run logic here
  };

  const handleSubmit = () => {
    console.log("Submit code");
    // Implement submit logic here
  };

  return (
    <div className="h-screen w-full" style={{ backgroundColor: "#1e1e1e" }}>
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
          <div className="h-full p-4 text-gray-200 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Problem Description</h2>
            <p className="text-gray-300">
              Given an array of integers nums and an integer target, return
              indices of the two numbers such that they add up to target. You
              may assume that each input would have exactly one solution, and
              you may not use the same element twice. You can return the answer
              in any order.
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Example:</h3>
            <pre className="bg-[#2d2d2d] p-2 rounded whitespace-pre-wrap text-gray-300">
              Input: nums = [2,7,11,15], target = 9 Output: [0,1] Explanation:
              Because nums[0] + nums[1] == 9, we return [0, 1].
            </pre>
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
                onChange={handleEditorChange}
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
            <ResizablePanel defaultSize={10}>
              <div
                className="h-full p-4 flex flex-col justify-end space-y-4"
                style={{ backgroundColor: "#252525" }}
              >
                <div className="flex justify-end space-x-4">
                  <Button
                    onClick={handleRun}
                    variant="secondary"
                    className="bg-[#3a3a3a] hover:bg-[#4a4a4a]"
                  >
                    Run
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
