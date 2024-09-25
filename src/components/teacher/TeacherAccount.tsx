import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../common/ErrorComponent";
import { Spinner } from "../common/Icons";

export interface AuthUser {
  id: string;
  name: string;
  role: "STUDENT" | "TEACHER";
}

function TeacherAccount() {
  const authUser: AuthUser = useAuthUser();
  const authHeader = useAuthHeader();

  const fetchTeacherData = async () => {
    console.log("Fetching student data...");
    const res = await axios.get(
      `${import.meta.env.VITE_ASSIGN_API}/api/teacher?id=${authUser.id}`,
      {
        headers: { Authorization: authHeader },
      }
    );
    return res.data.teacher;
  };

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["teacher", authUser.id],
    queryFn: fetchTeacherData,
    enabled: !!authUser.id,
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account</h2>
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder={user.email} />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default TeacherAccount;
