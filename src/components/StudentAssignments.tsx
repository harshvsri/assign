import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { Assignment } from "@/lib/types";

interface StudentAssignmentsProps {
  assignments: Assignment[];
}

function StudentAssignments({ assignments }: StudentAssignmentsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Assignments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle className="text-lg leading-tight">
                {assignment.title}
              </CardTitle>
              <CardDescription>Due: {assignment.dueDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2 line-clamp-3">{assignment.description}</p>
              <p className="text-sm text-muted-foreground">
                Teacher: {assignment.teacherName}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StudentAssignments;
