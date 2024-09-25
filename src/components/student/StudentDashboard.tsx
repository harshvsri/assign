import { useState } from "react";
import StudentAssignments from "./Assignments";
import StudentAccount from "./StudentAccount";
import StudentSidebar from "./StudentSidebar";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { assignments } from "@/lib/assignment";
import { User } from "@/lib/types";

function StudentDashboard() {
  const user: User = useAuthUser();
  const [activeTab, setActiveTab] = useState("assignments");

  return (
    <div className="flex h-screen bg-background text-foreground">
      <StudentSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        name={user.name}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === "assignments" && (
            <StudentAssignments assignments={assignments} />
          )}
          {activeTab === "account" && <StudentAccount />}
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
