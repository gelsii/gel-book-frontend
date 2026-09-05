import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserIcon } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import UseAxios from "@/utils/useAxios";

export default function SignInPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { isError, error, isPending, mutate, isSuccess } = useMutation({
    mutationFn: (from_client) =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST}/signin`,
        method: "post",
        data: { ...from_client },
        additonally: {
          withCredentials: true,
        },
      }),
    onSuccess: () => {
      location.assign("/dashboard");
    },
  });

  if (isError) {
    console.log(error?.response?.data.detail);
  }

  const handleSignInButton = (e) => {
    e.preventDefault();

    mutate({ email: form.email, password: form.password });
  };

  return (
    <>
      {!isSuccess && (
        <div className="flex justify-center items-center w-full h-full px-3">
          <Card className="w-full max-w-md h-fit shadow-2xl ">
            <CardHeader className={`justify-center items-start text-center `}>
              <div className="flex justify-center mt-5 items-center w-full">
                <UserIcon
                  width={60}
                  height={60}
                  className="border-2 rounded-full p-2 border-white"
                />
              </div>
              <CardTitle className={"text-xl"}>
                Sign In to your account
              </CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent className={"px-8 h-full "}>
              <form
                className="flex flex-col justify-around h-full "
                onSubmit={handleSignInButton}
              >
                <div className="flex flex-col gap-6 mt-3">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className={`h-10 invalid:border-red-500 valid:border-green-500 peer`}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="ex.admin123"
                      required
                      className={`h-10 invalid:border-red-500 peer`}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSignInButton()
                      }
                    />

                    {isError ? (
                      <p className="text-red-500 ml-1 text-xs mt-2">
                        {error?.response?.data.detail}
                      </p>
                    ) : null}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={isPending}
                >
                  {isPending ? "loading..." : "Sign in"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <CardDescription>
                You don't have account?{" "}
                <Link to="/auth/signup" className="underline">
                  create an account.
                </Link>
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
