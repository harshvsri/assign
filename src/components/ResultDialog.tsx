import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResultDialogProps {
  result: {
    compile_output: string;
    memory: number;
    message: null;
    status: { id: number; description: string };
    stderr: string;
    stdout: string;
    time: string;
  } | null;
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
          <DialogDescription className="flex flex-col justify-between">
            <span>Time: {result?.time}</span>
            <span>Memory: {result?.memory}</span>
          </DialogDescription>
        </DialogHeader>
        {result?.status.id === 12
          ? result?.stderr
            ? result?.stderr
            : "Expecting something"
          : ""}
      </DialogContent>
    </Dialog>
  );
}
