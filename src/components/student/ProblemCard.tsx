import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Problem } from "@/lib/types";

interface ProblemCardProps {
  problem: Problem;
}

function ProblemCard({ problem }: ProblemCardProps) {
  const navigate = useNavigate();
  const completed = false;
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-md flex justify-between items-center">
          {problem.title}
          {completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <Button
              onClick={() => navigate("/workspace", { state: { problem } })}
              size="sm"
            >
              Attempt
            </Button>
          )}
        </CardTitle>
        <CardDescription>Difficulty: {problem.difficulty}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">{problem.description}</p>
      </CardContent>
    </Card>
  );
}

export default ProblemCard;
