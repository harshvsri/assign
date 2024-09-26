import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { Assignment, User } from "@/lib/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../common/Icons";
import ErrorComponent from "../common/ErrorComponent";

function StudentAssignments() {
  const authUser: User = useAuthUser();
  const authHeader = useAuthHeader();

  const fetchStudentAssignments = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_ASSIGN_API}/api/assignment/teacher?id=${
        authUser.id
      }`,
      {
        headers: { Authorization: authHeader },
      }
    );
    return res.data.assignments;
  };

  const { data, error, isLoading } = useQuery<Assignment[]>({
    queryKey: ["teacher", authUser.id],
    queryFn: fetchStudentAssignments,
    enabled: !!authUser.id,
    staleTime: 1000 * 60, // Data is considered fresh for 1 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((assignment) => (
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
                {`${assignment.course} . ${assignment.branch} . ${assignment.year}`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StudentAssignments;
