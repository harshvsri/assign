'use client'

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutDashboard, UserCircle, Menu, X } from "lucide-react";

type Assignment = {
  id: string;
  title: string;
  description: string;
  teacherName: string;
  dueDate: string;
};

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Data Structures Assignment",
    description: "Implement a binary search tree",
    teacherName: "Dr. Smith",
    dueDate: "2023-06-15",
  },
  {
    id: "2",
    title: "Algorithm Analysis",
    description: "Analyze the time complexity of sorting algorithms",
    teacherName: "Prof. Johnson",
    dueDate: "2023-06-20",
  },
  {
    id: "3",
    title: "Database Systems",
    description: "Design a normalized schema for a library management system",
    teacherName: "Dr. Brown",
    dueDate: "2023-06-25",
  },
];

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<"assignments" | "account">("assignments");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border">
        <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border p-4 flex items-center justify-between md:justify-end">
          {/* Mobile menu button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 className="text-xl font-semibold md:hidden">Student Dashboard</h1>
        </header>

        {/* Mobile sidebar */}
        <div
          className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div
            ref={sidebarRef}
            className={`fixed inset-y-0 left-0 w-64 bg-card border-r border-border shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex justify-end p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <SidebarContent
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setIsMobileMenuOpen(false);
              }}
            />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === "assignments" && (
            <AssignmentsView assignments={mockAssignments} />
          )}
          {activeTab === "account" && <AccountView />}
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: "assignments" | "account") => void;
}) {
  return (
    <>
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold">Student Dashboard</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Button
              variant={activeTab === "assignments" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("assignments")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Assignments
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === "account" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("account")}
            >
              <UserCircle className="mr-2 h-4 w-4" />
              Account
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
}

function AssignmentsView({ assignments }: { assignments: Assignment[] }) {
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

function AccountView() {
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
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btech">B.Tech</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year" />
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
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cse">CSE</SelectItem>
                  <SelectItem value="cse_ai">CSE AI</SelectItem>
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