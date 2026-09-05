import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftToLine,
  LogOutIcon,
  MessageSquareWarning,
  UsersRound,
} from "lucide-react";
import userIdContext from "@/contexts/userId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import UseAxios from "@/utils/useAxios";
import { toast } from "sonner";

export default function PostPage() {
  const [formPost, setFormPost] = useState({
    title: "",
    description: "",
    audience: "public",
  });
  const { userId } = useContext(userIdContext);
  const [isDisabledMutate, setIsDisabledMutate] = useState(true);

  const queryClient = useQueryClient();

  const { data, isPending, isError, mutate, error, isSuccess } = useMutation({
    mutationFn: ({ id, title, description, audience }) =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST}/posts`,
        method: "post",
        data: { id, title, description, audience },
      }),
    onSuccess: (data) => {
      toast.success(data.detail);
      setIsDisabledMutate(false);
      setTimeout(() => setIsDisabledMutate(true), 6000);
    },
  });

  if (isError) {
    console.log(error?.response);
  }

  const handleNextButton = (e) => {
    e.preventDefault();

    if (isDisabledMutate) {
      mutate({
        id: userId,
        title: formPost.title,
        description: formPost.description,
        audience: formPost.audience,
      });

      queryClient.invalidateQueries(["api", "users", "posts"]);

      if (isSuccess) {
      }
    }
  };

  return (
    <>
      <section className="w-full h-full mb-10 md:px-15 lg:px-20 xl:px-50 2xl:px-70">
        <Button variant="secondary" className={"mt-6"}>
          <ArrowLeftToLine color="black" /> Back
        </Button>
        <div className="w-full grid gap-2 place-content-center mt-7">
          <Label className="text-white w-full justify-center text-3xl font-heading md:text-4xl">
            New <span className="text-[#e2e353]">Post</span>
          </Label>
          <p className="text-[#e0e3e6] w-full justify-center text-sm md:text-base">
            You can create a post to see the people!
          </p>
        </div>

        {/* <div className="mt-15 flex justify-start gap-1 items-center mb-5 bg-[#fcfae4] w-fit px-2 py-1 rounded-lg ml-1">
          <div className="rounded-full border-2 bg-[#83842d] w-6 h-6 grid place-content-center text-white text-xs p-3">
            {userEmailValue.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-black text-sm">{userEmailValue}</h1>
        </div> */}
        <form action="" className="mt-10">
          <div className="w-full grid gap-5">
            <Input
              type="text"
              placeholder="title"
              className={"h-11 text-xl text-white"}
              onChange={(e) =>
                setFormPost({ ...formPost, title: e.target.value })
              }
              required
            />
            <Textarea
              className={
                "w-full h-70 resize-none text-white text-xl p-4 lg:text-2xl xl:h-80 2xl:h-120"
              }
              placeholder="What's on your mind?"
              onChange={(e) =>
                setFormPost({ ...formPost, description: e.target.value })
              }
              required
            />
          </div>

          {/* <div className="w-full flex justify-end items-center">
          <Button
            variant="secondary"
            className="w-full mt-6 bg-[#dfe141] font-bold text-base h-8 hover:bg-[#ccce3d] md:h-10 md:max-w-xs"
            disabled={isPending}
            onClick={handleNextButton}
          >
            {isPending ? "loading..." : "Next"}
          </Button>
        </div> */}
        </form>

        <div className="w-full flex justify-end items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="w-full mt-6 bg-[#dfe141] font-bold text-base h-8 hover:bg-[#ccce3d] md:h-10 md:max-w-xs"
                type="submit"
              >
                Next
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className={"grid place-content-center text-center"}>
                <DialogTitle>Sharing Options</DialogTitle>
                <DialogDescription>
                  You can customize audience
                </DialogDescription>
              </DialogHeader>
              <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                <Separator />
                <div className="grid gap-2 mt-3">
                  <h1 className="flex gap-2">
                    <UsersRound /> Post Audience
                  </h1>
                  <RadioGroup defaultValue="public" className="w-fit mt-1">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="public"
                        id="r1"
                        onClick={(e) =>
                          setFormPost({
                            ...formPost,
                            audience: e.target.value,
                          })
                        }
                      />
                      <Label htmlFor="r1">Public</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value="private"
                        id="r2"
                        onClick={(e) =>
                          setFormPost({
                            ...formPost,
                            audience: e.target.value,
                          })
                        }
                      />
                      <Label htmlFor="r2">Only you</Label>
                    </div>
                  </RadioGroup>
                </div>
                {isError && (
                  <p className="text-red-500 mt-3">
                    {error?.response.data.detail}
                  </p>
                )}
              </div>
              <DialogFooter className={"grid place-items-start"}>
                <DialogClose asChild>
                  <Button
                    variant="default"
                    className={"w-30"}
                    disabled={isPending || !isDisabledMutate}
                    onClick={handleNextButton}
                  >
                    {isPending ? "posting..." : "Post"}
                  </Button>
                </DialogClose>
                {!isDisabledMutate && (
                  <p className="text-red-500 ml-1 flex gap-2 items-center">
                    <MessageSquareWarning /> Wait 6 seconds to create new post
                    again.
                  </p>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
}
