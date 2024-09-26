import { useState } from "react";
import StudentAssignments from "./StudentAssignments";
import StudentAccount from "./StudentAccount";
import StudentSidebar from "./StudentSidebar";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "@/lib/types";
import NotFound from "../common/NotFound";
import ChatBot from "../common/ChatBot";

function StudentDashboard() {
  const authUser: User = useAuthUser();
  const [activeTab, setActiveTab] = useState("assignments");

  return (
    <div className="flex h-screen bg-background text-foreground">
      <StudentSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        name={authUser.name}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === "null" && <NotFound />}
          {activeTab === "assignments" && <StudentAssignments />}
          {activeTab === "account" && <StudentAccount />}
          {activeTab === "ask-ai" && <ChatBot />}
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
