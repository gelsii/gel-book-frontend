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
import { Input } from "./ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleUser, Heart, MessageCircle, SendHorizonal } from "lucide-react";
import { Button } from "./ui/button";

import userIdContext from "@/contexts/userId";
import { useContext, useRef, useState } from "react";
import UseAxios from "@/utils/useAxios";

export default function CardCommentComponent({ post_id, commentsInPost }) {
  const [commentUser, setCommentUser] = useState("");
  const InputSendCommentRef = useRef(null);

  const queryClient = useQueryClient();
  const { userId } = useContext(userIdContext);

  const sendComment = useMutation({
    mutationFn: ({ id_user, id_post, message }) =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST}/posts/comments`,
        method: "post",
        data: { id_user, id_post, message },
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["api", "users", "profile"]);
      queryClient.refetchQueries(["api", "users", "profile"]);
    },
  });

  const handleSendComment = () => {
    sendComment.mutate({
      id_user: userId,
      id_post: post_id,
      message: commentUser,
    });

    InputSendCommentRef.current.value = null;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <MessageCircle /> {commentsInPost.length}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        <section className="-mx-4 no-scrollbar min-h-40 max-h-110 overflow-y-auto px-4 sm:max-h-130">
          {commentsInPost.map((value, index) => {
            return (
              <main key={index}>
                <div className="flex gap-2">
                  <CircleUser />
                  <DialogDescription>@{value.username}</DialogDescription>
                </div>
                <div className="ml-8">
                  <p className="">{value.message}</p>
                  <div className="flex justify-between items-center mt-2">
                    <DialogDescription>Reply</DialogDescription>
                    <div className="mr-2">
                      <Heart className="w-5 h-5" />
                    </div>
                  </div>

                  <div className=""></div>
                </div>
              </main>
            );
          })}
        </section>
        <DialogFooter>
          <div className="w-full flex gap-2 justify-center items-center">
            <Input
              type="text"
              onChange={(e) => setCommentUser(e.target.value)}
              onKeyDown={(e) => {
                //console.log(e)
                if (e.key === "Enter") {
                  handleSendComment();
                }
              }}
              ref={InputSendCommentRef}
            />
            <Button
              className={"w-15"}
              onClick={handleSendComment}
              disabled={sendComment.isPending}
            >
              <SendHorizonal />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
