import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { Assignment } from "@/lib/types";
import AssignmentDialog from "./AssignmentDialog";

interface StudentAssignmentsProps {
  assignments: Assignment[];
}

function StudentAssignments({ assignments }: StudentAssignmentsProps) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle className="text-lg leading-tight">
                {assignment.title}
              </CardTitle>
              <CardDescription className="mt-1">
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2 line-clamp-3">{assignment.description}</p>
              <p className="text-sm text-muted-foreground mb-4">
                Teacher: {assignment.teacherName}
              </p>
              <AssignmentDialog assignment={assignment} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StudentAssignments;
