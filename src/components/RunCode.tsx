import { useState } from "react";
import { Problem } from "@/lib/types";
import { Button } from "./ui/button";
import RunDialog from "./RunDialog";
import { Spinner } from "./Icons";

interface RunCodeProps {
  problem: Problem;
  code: string;
}

function RunCode({ problem, code }: RunCodeProps) {
  const [runLoading, setRunLoading] = useState(false);
  const [openRunDialog, setOpenRunDialog] = useState(false);
  const [runResult, setRunResult] = useState(null);

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
  return (
    <>
      <Button
        onClick={handleRun}
        variant="default"
        className="text-white bg-[#3a3a3a] hover:bg-[#4a4a4a]"
      >
        {runLoading ? <Spinner /> : "Run"}
      </Button>
      <RunDialog
        testCase={problem.testCases[0]}
        result={runResult}
        open={openRunDialog}
        onOpenChange={setOpenRunDialog}
      />
    </>
  );
}

export default RunCode;
