import {
  LayoutDashboard,
  UserCircle,
  Verified,
  Lock,
  PlusCircle,
  MessageCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import SignOut from "../common/SignOut";
import { SidebarProps } from "@/lib/types";

function SidebarContent({ activeTab, setActiveTab, name }: SidebarProps) {
  return (
    <nav className="flex-1 py-6 mt-4">
      <ul className="space-y-2 px-4">
        <li>
          <Button
            variant="ghost"
            className="w-full justify-start text-xl font-semibold"
          >
            Hey, {name}
          </Button>
        </li>
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
            variant={activeTab === "create-assignment" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("create-assignment")}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Assignments
          </Button>
        </li>
        <li>
          <Button
            variant={activeTab === "ask-ai" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("ask-ai")}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Ask AI
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
        <li>
          <Button
            variant={activeTab === "verify-account" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("null")}
          >
            <Verified className="mr-2 h-4 w-4" />
            Verify Account
          </Button>
        </li>
        <li>
          <Button
            variant={activeTab === "change-password" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("null")}
          >
            <Lock className="mr-2 h-4 w-4" />
            Change Password
          </Button>
        </li>
        <li>
          <SignOut />
        </li>
      </ul>
    </nav>
  );
}

export default SidebarContent;
