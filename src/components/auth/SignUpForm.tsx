import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Spinner } from "../common/Icons";
import ErrorAlert from "../common/ErrorAlert";

function SignUpForm() {
  const signin = useSignIn();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const handleSignUp = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/student/signup",
        data
      );
      if (res.status == 201) {
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
      return res.data;
    } catch (error) {
      const errorMessages = error.response?.data?.errors || [
        { msg: error.message },
      ];
      setErrors(errorMessages);
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: handleSignUp,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
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
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
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
              onChange={handleChange}
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
              autoComplete="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit">{isPending ? <Spinner /> : "Sign Up"}</Button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
