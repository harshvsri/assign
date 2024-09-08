import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Time, Memory } from "./Icons";
import { formatErrorMessage } from "@/lib/methods";

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface Result {
  compile_output: string;
  memory: number;
  message: null;
  status: { id: number; description: string };
  stderr: string;
  stdout: string;
  time: string;
}

interface SubmitResultDialogProps {
  testCases?: TestCase[];
  results?: Result[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SubmitResult({
  testCases,
  results,
}: {
  testCases?: TestCase[];
  results?: Result[];
}) {
  if (
    !testCases ||
    !results ||
    testCases.length === 0 ||
    results.length === 0
  ) {
    return <div className="text-white">No test results available.</div>;
  }

  return (
    <div className="space-y-4">
      {testCases.map((testCase, index) => {
        const result = results[index];
        const passed = result?.status.id === 4; // Accepted
        return (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg"
          >
            <div className="flex-shrink-0">
              {passed ? (
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                  <X className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
            <div className="flex-grow space-y-2">
              <h3 className="text-lg font-semibold text-white">
                Test Case {index + 1}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Input</h4>
                  <ScrollArea className="h-24 w-full rounded border border-gray-700">
                    <pre className="p-2 text-sm text-white whitespace-pre-wrap">
                      {testCase.input}
                    </pre>
                  </ScrollArea>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">
                    Expected Output
                  </h4>
                  <ScrollArea className="h-24 w-full rounded border border-gray-700">
                    <pre className="p-2 text-sm text-white whitespace-pre-wrap">
                      {testCase.expectedOutput}
                    </pre>
                  </ScrollArea>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">
                    Actual Output
                  </h4>
                  <ScrollArea className="h-24 w-full rounded border border-gray-700">
                    <pre className="p-2 text-sm text-white whitespace-pre-wrap">
                      {result?.stdout}
                    </pre>
                  </ScrollArea>
                </div>
              </div>
              <div className="flex flex-row justify-start gap-4 mt-2 text-white">
                <div className="flex flex-row items-center gap-2">
                  <Time />
                  <span>{result ? parseFloat(result.time) * 1000 : 0} ms</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Memory />
                  <span>{result?.memory || 0} KB</span>
                </div>
              </div>
              {!passed && result?.stderr && (
                <div className="mt-2 p-2 bg-red-900 rounded">
                  <pre className="text-sm text-red-300 whitespace-pre-wrap">
                    {formatErrorMessage(result.stderr)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SubmitResultDialog({
  testCases,
  results,
  open,
  onOpenChange,
}: SubmitResultDialogProps) {
  const allTestsPassed =
    results?.every((result) => result.status.id === 4) ?? false;
  const titleColor = allTestsPassed ? "text-green-500" : "text-red-500";
  const title = allTestsPassed ? "All Tests Passed" : "Some Tests Failed";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[80vw] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={`text-3xl font-bold ${titleColor}`}>
            {title}
          </DialogTitle>
          <DialogDescription className="text-white mt-4">
            {results
              ? `${results.filter((r) => r.status.id === 4).length} out of ${
                  results.length
                } tests passed.`
              : "No test results available."}
          </DialogDescription>
        </DialogHeader>
        <SubmitResult testCases={testCases} results={results} />
      </DialogContent>
    </Dialog>
  );
}
