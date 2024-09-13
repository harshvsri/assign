import { useState } from "react";
import { Problem } from "@/lib/types";
import { Button } from "./ui/button";
import SubmitDialog from "./SubmitDialog";
import { Spinner } from "./Icons";

interface SubmitCodeProps {
  problem: Problem;
  code: string;
}

function SubmitCode({ problem, code }: SubmitCodeProps) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

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
    <>
      <Button
        onClick={handleSubmit}
        className="text-white  bg-green-600 hover:bg-green-700"
      >
        {submitLoading ? <Spinner /> : "Submit"}
      </Button>
      <SubmitDialog
        testCases={problem.testCases}
        results={submitResult}
        open={openSubmitDialog}
        onOpenChange={setOpenSubmitDialog}
      />
    </>
  );
}

export default SubmitCode;
