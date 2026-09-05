import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UseAxios from "@/utils/useAxios";
import { useMutation } from "@tanstack/react-query";
import { UserCircle } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function SignUpPage() {
  const [formSignUp, setFormSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { data, isPending, mutate, isError, error } = useMutation({
    mutationFn: (from_client) =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST}/signup`,
        method: "post",
        data: { ...from_client },
      }),
    onSuccess: (data) => toast.success(data.detail),
    onError: (err) => toast.error(err.response.data.detail),
  });

  const fields = [
    {
      type: "text",
      name: "username",
      label: "Username",
      placeholder: "ex.admin",
      onchange: (e) =>
        setFormSignUp({ ...formSignUp, username: e.target.value }),
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "ex.admin@example.com",
      onchange: (e) => setFormSignUp({ ...formSignUp, email: e.target.value }),
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "ex.admin*****w123",
      onchange: (e) =>
        setFormSignUp({ ...formSignUp, password: e.target.value }),
      onkeydown: (e) => e.key === "Enter" && handleSignUpButton(),
    },
  ];

  const handleSignUpButton = (e) => {
    e.preventDefault();
    mutate({ ...formSignUp });
  };

  return (
    <section className="w-full h-full flex justify-center items-center px-3">
      <Card className={"w-full max-w-md h-fit shadow-2xl"}>
        <CardHeader className={"text-center "}>
          <div className="flex justify-center items-center">
            <UserCircle width={60} height={60} />{" "}
          </div>
          <CardTitle className={"text-3xl"}>Sign up account</CardTitle>
          <CardDescription>Mag Sign Up kana!!! Galit na ako!</CardDescription>
        </CardHeader>
        <CardContent className={"h-fit place-content-center px-7"}>
          <form action="" className="grid gap-5" onSubmit={handleSignUpButton}>
            {fields.map((value, index) => {
              return (
                <div className="grid gap-2" key={index}>
                  <Label htmlfor={value.name}>{value.label}</Label>
                  <Input
                    type={value.type}
                    id={value.name}
                    className={"h-10 w-full"}
                    onChange={value.onchange}
                    placeholder={value.placeholder}
                    onKeyDown={value.onkeydown}
                    required
                  />
                </div>
              );
            })}

            {isError ? (
              <p className="text-red-500 ml-1">
                {error?.response?.data.detail}
              </p>
            ) : null}

            <Button className={"w-full h-9"} disabled={isPending}>
              {isPending ? "loading..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className={"h-15 grid gap-2 place-items-center"}>
          <CardDescription className={"mb-10"}>
            Do you already have an account?{" "}
            <Link to="/auth/signin" className="underline">
              Sign In
            </Link>{" "}
          </CardDescription>
        </CardFooter>
      </Card>
    </section>
  );
}
