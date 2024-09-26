import { School, User } from "lucide-react";
import { Button } from "../ui/button";

interface UserToggleProps {
  role: "STUDENT" | "TEACHER";
  setRole: (role: "STUDENT" | "TEACHER") => void;
}

function UserToggle({ role, setRole }: UserToggleProps) {
  return (
    <div className="flex rounded-md overflow-hidden border mb-4">
      <Button
        type="button"
        variant={role === "STUDENT" ? "default" : "ghost"}
        className={`flex-1 rounded-none ${
          role === "STUDENT"
            ? "bg-primary text-primary-foreground"
            : "bg-background"
        }`}
        onClick={() => setRole("STUDENT")}
      >
        <User className="mr-2 h-4 w-4" />
        Student
      </Button>
      <Button
        type="button"
        variant={role === "TEACHER" ? "default" : "ghost"}
        className={`flex-1 rounded-none ${
          role === "TEACHER"
            ? "bg-primary text-primary-foreground"
            : "bg-background"
        }`}
        onClick={() => setRole("TEACHER")}
      >
        <School className="mr-2 h-4 w-4" />
        Teacher
      </Button>
    </div>
  );
}

export default UserToggle;
