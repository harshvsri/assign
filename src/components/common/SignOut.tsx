import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleClick = () => {
    signOut();
    navigate("/");
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      onClick={handleClick}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </Button>
  );
}

export default SignOut;
