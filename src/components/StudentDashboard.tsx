import { useState } from "react";
import { mockAssignments } from "@/lib/data";
import StudentAssignments from "./StudentAssignments";
import StudentAccount from "./StudentAccount";
import StudentSidebar from "./StudentSidebar";

function Header() {
  return (
    <header className="bg-card border-b border-border p-4 flex items-center justify-between md:justify-end">
      <div className="w-8 md:hidden" />
      <h1 className="text-xl font-semibold">Student Dashboard</h1>
      <div className="w-8 md:hidden" />
    </header>
  );
}

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<"assignments" | "account">(
    "assignments"
  );

  return (
    <div className="flex h-screen bg-background text-foreground">
      <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === "assignments" && (
            <StudentAssignments assignments={mockAssignments} />
          )}
          {activeTab === "account" && <StudentAccount />}
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
