import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";

export function EditPostComponent({
  trigger,
  id,
  title,
  description,
  audience,
}) {
  const [formUpdatePost, setFormUpdatePost] = useState({
    title: "",
    description: "",
    audience: "",
  });

  const { userId } = useContext(userIdContext);

  const { data, isPending, mutate, isError, error } = useMutation({
    mutationFn: (requested_data) =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST}/posts`,
        method: "put",
        data: { ...requested_data },
      }),
    onSuccess: (data) => toast.success(data.detail),
    onError: (err) => toast.error(err.response.data.detail),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>You can update your post!</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <form
            action=""
            className="w-full grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              mutate({ user: userId, post: id, ...formUpdatePost });
            }}
          >
            <div className="grid flex-1 gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                defaultValue={title}
                required
                onChange={(e) =>
                  setFormUpdatePost({
                    ...formUpdatePost,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid flex-1 gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className={"h-50 resize-none"}
                defaultValue={description}
                required
                onChange={(e) =>
                  setFormUpdatePost({
                    ...formUpdatePost,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <RadioGroup defaultValue={audience} className="w-fit flex mt-1">
              <Label>Audience: </Label>
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="public"
                  id="r1"
                  onClick={(e) =>
                    setFormUpdatePost({
                      ...formUpdatePost,
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
                    setFormUpdatePost({
                      ...formUpdatePost,
                      audience: e.target.value,
                    })
                  }
                />
                <Label htmlFor="r2">Only you</Label>
              </div>
            </RadioGroup>

            <Button variant="default" disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { Trash2Icon } from "lucide-react";

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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import userIdContext from "@/contexts/userId";
import UseAxios from "@/utils/useAxios";
import { toast } from "sonner";
import { RadioGroupItem, RadioGroup } from "./ui/radio-group";

export function DeletePostComponent({ id }) {
  const { userId } = useContext(userIdContext);

  const queryClient = useQueryClient();

  const { data, isPending, isError, error, mutate } = useMutation({
    mutationFn: (from_mutate) =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST}/posts?id_post=${from_mutate.id_post}&id=${from_mutate.id}`,
        method: "delete",
      }),
    onSuccess: (data) => {
      toast.success(data.detail);
      queryClient.refetchQueries(["api", "users", "posts"]);
    },
    onError: (error) => toast.error(error.response.data.detail),
  });

  const handleDeletePost = () => {
    toast.message("deleting post... Please wait");
    mutate({ id_post: id, id: userId });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className={"h-8 justify-start w-full"}>
          <TrashIcon /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete post?</AlertDialogTitle>
          <AlertDialogDescription>
            You can't recover this. Because this will permanently delete this
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={isPending}>
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDeletePost}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function DropDownMenuPost({
  button,
  id,
  title,
  description,
  audience,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <EditPostComponent
            trigger={
              <Button variant="ghost" className={"h-8 justify-start w-full"}>
                <PencilIcon />
                Edit
              </Button>
            }
            id={id}
            title={title}
            description={description}
            audience={audience}
          />
          <DropdownMenuItem>
            <ShareIcon />
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DeletePostComponent id={id} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
