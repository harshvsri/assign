import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import SidebarContent from "./SidebarContent";
import { Menu } from "lucide-react";
import { SidebarProps } from "@/lib/types";

function StudentSidebar({ activeTab, setActiveTab, name }: SidebarProps) {
  return (
    <>
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border">
        <SidebarContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          name={name}
        />
      </aside>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <SidebarContent
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              name={name}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default StudentSidebar;
