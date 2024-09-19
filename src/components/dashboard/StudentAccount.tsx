import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export interface AuthUser {
  id: string;
  name: string;
  role: "STUDENT" | "TEACHER";
}

function StudentAccount() {
  const authUser: AuthUser = useAuthUser();
  const authHeader = useAuthHeader();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/student?id=${authUser.id}`,
          {
            headers: { Authorization: authHeader },
          }
        );
        setUser(res.data.student);
        console.log(res.data.student);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [authHeader, authUser.id]);

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
              <Input id="name" placeholder={user?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder={user?.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select>
                <SelectTrigger id="course">
                  <SelectValue placeholder={user?.course} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btech">BTECH</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select>
                <SelectTrigger id="year">
                  <SelectValue placeholder={user?.year} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year_1">Year 1</SelectItem>
                  <SelectItem value="year_2">Year 2</SelectItem>
                  <SelectItem value="year_3">Year 3</SelectItem>
                  <SelectItem value="year_4">Year 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Select>
                <SelectTrigger id="branch">
                  <SelectValue placeholder={user?.branch} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cse">CSE</SelectItem>
                  <SelectItem value="cse_ai">CSE_AI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default StudentAccount;
