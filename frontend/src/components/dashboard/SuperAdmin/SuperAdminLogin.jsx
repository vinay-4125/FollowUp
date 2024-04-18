import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Dot } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SuperAdminLogin = () => {
  const [password, setPassword] = useState("");
  const [correct, setCorrect] = useState(true);
  const navigate = useNavigate();
  const handleChange = (value) => {
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/superadminlogin", { password });
      if (res.status === 200) {
        navigate("/superadmin/dashboard");
      } else {
        setPassword("");
        setCorrect(false);
      }
    } catch (error) {
      setCorrect(false);
      console.log(error);
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
        <nav className="h-14 flex items-center justify-between px-4">
          <div className="hidden lg:block">
            <Link to="/" className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <h1 className="text-4xl lg:text-4xl mx-auto flex items-center justify-center">
                FollowUp.
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <ThemeToggle />
          </div>
        </nav>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-screen gap-5 max-h-full justify-center items-center"
      >
        <h1 className="flex sm:flex-row flex-col text-center">
          SuperAdmin <Dot className="hidden sm:block" size={52} /> Login
        </h1>
        <InputOTP
          maxLength={6}
          value={password}
          onChange={(value) => handleChange(value)}
        >
          <div
            className={`flex items-center ${correct ? "" : "animate-shake"}`}
          >
            <InputOTPGroup>
              <InputOTPSlot
                className={`flex items-center  ${
                  correct ? "" : "border border-l-red-500 border-y-red-500"
                }`}
                index={0}
              />
              <InputOTPSlot
                className={`flex items-center  ${
                  correct ? "" : "border border-red-500"
                }`}
                index={1}
              />
              <InputOTPSlot
                className={`flex items-center ${
                  correct ? "" : "border border-y-red-500 border-r-red-500"
                }`}
                index={2}
              />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot
                className={`flex items-center ${
                  correct ? "" : "border border-l-red-500 border-y-red-500"
                }`}
                index={3}
              />
              <InputOTPSlot
                className={`flex items-center  ${
                  correct ? "" : "border border-red-500"
                }`}
                index={4}
              />
              <InputOTPSlot
                className={`flex items-center  ${
                  correct ? "" : "border border-y-red-500 border-r-red-500"
                }`}
                index={5}
              />
            </InputOTPGroup>
          </div>
        </InputOTP>
        <div className="text-center text-sm">
          {password === "" ? (
            <>Enter your password.</>
          ) : (
            <>You entered: {password}</>
          )}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default SuperAdminLogin;
