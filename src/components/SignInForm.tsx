import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { School } from "lucide-react";
import ErrorAlert from "./ErrorAlert";
import { jwtDecode } from "jwt-decode";
import { Spinner } from "./Icons";

function SignInForm() {
  const navigate = useNavigate();
  const signin = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/student/signin",
        formData
      );

      if (res.status == 200) {
        const { accessToken, refreshToken } = res.data;
        const decodedData = jwtDecode(accessToken);
        if (
          signin({
            auth: {
              token: accessToken,
              type: "Bearer",
            },
            refresh: refreshToken,
            userState: decodedData,
          })
        ) {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      setErrors(error.response.data.errors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          {errors &&
            errors.map((err, index) => (
              <ErrorAlert key={index} errorTitle={err.msg} />
            ))}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <Button type="submit">{isLoading ? <Spinner /> : "Sign In"}</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button">
        <School className="mr-2 h-4 w-4" />
        Campus Login
      </Button>
    </div>
  );
}

export default SignInForm;
