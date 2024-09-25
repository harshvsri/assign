import { useState } from "react";
import TeacherAccount from "./TeacherAccount";
import Sidebar from "./TeacherSidebar";
// import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import SignOut from "../common/SignOut";
import { CreateAssignment } from "./CreateAssignment";

interface HeaderProps {
  name: string;
}

interface User {
  id: string;
  name: string;
  role: "STUDENT" | "TEACHER";
}

function Header({ name }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border p-4 flex items-center justify-between md:justify-end">
      <div className="w-8 md:hidden" />
      <h1 className="text-xl font-semibold">Hello, {name}</h1>
      <SignOut />
      <div className="w-8 md:hidden" />
    </header>
  );
}

function TeacherDashboard() {
  // const user: User = useAuthUser();
  const user: User = { id: "3849679", name: "John Doe", role: "TEACHER" };
  const [activeTab, setActiveTab] = useState<"assignments" | "account">(
    "assignments"
  );

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header name={user.name} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === "assignments" && <CreateAssignment />}
          {activeTab === "account" && <TeacherAccount />}
        </main>
      </div>
    </div>
  );
}

export default TeacherDashboard;
