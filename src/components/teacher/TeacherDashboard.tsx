import { useState } from "react";
import TeacherAccount from "./TeacherAccount";
import Sidebar from "./TeacherSidebar";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { CreateAssignment } from "./CreateAssignment";
import { User } from "@/lib/types";

function TeacherDashboard() {
  const user: User = useAuthUser();
  const [activeTab, setActiveTab] = useState("assignments");

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        name={user.name}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === "assignments" && <CreateAssignment />}
          {activeTab === "account" && <TeacherAccount />}
        </main>
      </div>
    </div>
  );
}

export default TeacherDashboard;
