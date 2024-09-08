import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Time, Memory } from "./Icons";
import { formatErrorMessage } from "@/lib/methods";
import { Result, TestCase } from "@/lib/types";
import { Check, X } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ResultDialogProps {
  testCase: TestCase;
  result: Result | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function TestResult({
  testCase,
  result,
}: {
  testCase?: TestCase;
  result?: Result;
}) {
  if (!testCase || !result) {
    return <div className="text-white">No test results available.</div>;
  }
  const passed = result?.status.id === 4; // Accepted

  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-4 p-4 bg-dark rounded-lg border-4 border-gray-700">
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
            <div className="mt-2 p-2 bg-dark rounded">
              <pre className="text-sm text-red-600 whitespace-pre-wrap">
                {formatErrorMessage(result.stderr)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ResultDialog({
  testCase,
  result,
  open,
  onOpenChange,
}: ResultDialogProps) {
  const titleColor =
    result?.status.description === "Accepted"
      ? "text-green-500"
      : "text-red-500";
  const description =
    result?.status.id !== 4 ? "Test Case Failed" : "Test Case Passed";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[80vw] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={`text-3xl font-bold ${titleColor}`}>
            {result?.status.description}
          </DialogTitle>
          <DialogDescription className=" text-white mt-4">
            {description}
          </DialogDescription>
        </DialogHeader>
        <TestResult testCase={testCase} result={result} />
      </DialogContent>
    </Dialog>
  );
}
