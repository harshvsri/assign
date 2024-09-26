import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import ProblemCard from "./ProblemCard";
import { Assignment } from "@/lib/types";

interface AssignmentDialogProps {
  assignment: Assignment;
}

function AssignmentDialog({ assignment }: AssignmentDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Show Problems
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{assignment.title} - Problems</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {assignment.problems?.map((problem, index) => (
            <ProblemCard key={index} problem={problem} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AssignmentDialog;
