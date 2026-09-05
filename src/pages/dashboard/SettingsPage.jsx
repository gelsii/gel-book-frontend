import { CircleUserIcon, LogOutIcon, Settings, UserIcon } from "lucide-react";
import React, { useContext } from "react";
import { Separator } from "@/components/ui/separator";
import userIdContext from "@/contexts/userId";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import UseAxios from "@/utils/useAxios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SettingsPage() {
  const { userId } = useContext(userIdContext);

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["api", "users", "settings"],
    queryFn: () =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST}/settings?id=${userId}`,
        method: "get",
      }),
  });

  const logoutUser = useMutation({
    mutationFn: () =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST}/logout`,
        method: "get",
        additonally: { withCredentials: true },
      }),
    onSuccess: () => location.assign("/auth/signin"),
    onError: (data) => toast.error(data.response.data.detail),
  });

  if (isError) {
    console.log(error);
  }

  const handleLogoutButton = () => {
    toast.message("loading... Please wait.");
    logoutUser.mutate();
  };

  return (
    <section className="w-full h-full flex flex-col gap-2  text-white px-2 min-[485px]:px-5 sm:px-10 md:px-15 md:max-w-4xl 2xl:max-w-5xl">
      <div className="flex w-full justify-between mt-4 mb-1 lg:mt-7">
        <h1 className="text-base flex gap-2 text-[#ced45e]">
          <Settings color="#a3a939" /> Settings
        </h1>
      </div>

      <Separator className={"bg-[#a3a939]"} />

      <div>
        <h1 className="flex gap-2 text-lg mb-2 mt-1 items-center">
          <CircleUserIcon className="w-6 h-6" />
          my details
        </h1>

        {isSuccess && (
          <div className="grid gap-4">
            <div className="flex gap-2 mt-2">
              <Label htmlFor="" className={"text-base"}>
                Username:{" "}
              </Label>
              <Input
                type="text"
                className={"h-7"}
                disabled={true}
                defaultValue={data.detail.username}
              />
            </div>

            <div className="flex gap-2 mt-2">
              <Label htmlFor="" className={"text-base"}>
                Email:{" "}
              </Label>
              <Input
                type="text"
                className={"h-7"}
                disabled={true}
                defaultValue={data.detail.email}
              />
            </div>

            <div className="flex gap-2 mt-2">
              <Label htmlFor="" className={"text-base"}>
                Password:{" "}
              </Label>
              <Input
                type="password"
                className={"h-7"}
                disabled={true}
                defaultValue={data.detail.password}
              />
            </div>
          </div>
        )}
      </div>

      <Separator className={"bg-[#a3a939]"} />

      <div className="w-full mt-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className={"w-full"}>
              <LogOutIcon /> logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <LogOutIcon />
              </AlertDialogMedia>
              <AlertDialogTitle>Logout Account?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to log out? You’ll need to log in again to
                access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                variant="outline"
                disabled={logoutUser.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <Button
                variant="destructive"
                disabled={logoutUser.isPending}
                onClick={handleLogoutButton}
              >
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
}
