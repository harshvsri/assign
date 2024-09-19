import RunCode from "./RunCode";
import SubmitCode from "./SubmitCode";
import { Problem } from "@/lib/types";

interface CodeActionsProps {
  problem: Problem;
  code: string;
}

function CodeActions({ problem, code }: CodeActionsProps) {
  return (
    <div
      className="h-full p-4 flex flex-col justify-end space-y-4"
      style={{ backgroundColor: "#1e1e1e" }}
    >
      <div className="flex justify-end space-x-4">
        <RunCode problem={problem} code={code} />
        <SubmitCode problem={problem} code={code} />
      </div>
    </div>
  );
}

export default CodeActions;
