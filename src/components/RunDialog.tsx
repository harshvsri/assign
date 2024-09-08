import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Time, Memory } from "./Icons";
import { formatErrorMessage } from "@/lib/methods";
import { Result } from "@/lib/types";

interface ResultDialogProps {
  result: Result | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResultDialog({
  result,
  open,
  onOpenChange,
}: ResultDialogProps) {
  const titleColor =
    result?.status.description === "Accepted"
      ? "text-green-500"
      : "text-red-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={`text-3xl font-bold ${titleColor}`}>
            {result?.status.description}
          </DialogTitle>
          <DialogDescription className="flex flex-row justify-start gap-4 mt-4 text-white">
            <div className="flex flex-row items-center gap-2">
              <Time />
              <span>{parseFloat(result?.time ?? "0") * 1000} ms</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Memory />
              <span>{result?.memory} KB</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        {result?.status.id !== 3 && result?.stderr && (
          <div className=" bg-dark  p-4 rounded-md overflow-x-auto">
            <pre className="text-sm text-red-600 whitespace-pre-wrap">
              {formatErrorMessage(result.stderr)}
            </pre>
          </div>
        )}
        {result?.status.id === 4 && (
          <div className="bg-dark  p-4 rounded-md overflow-x-auto">
            <pre className="text-sm text-red-600 whitespace-pre-wrap">
              Result did not match to expected answer
            </pre>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
