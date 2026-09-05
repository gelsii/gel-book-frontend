import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";
import { Separator } from "@/components/ui/separator";
import userIdContext from "@/contexts/userId";
import UseAxios from "@/utils/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SendHorizonal } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";

export default function GlobalChatPage() {
  const [messageUser, setMessageUser] = useState("");
  const { userId } = useContext(userIdContext);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["api", "users", "global-chats"],
    queryFn: () =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST}/global-chats?id=${userId}`,
        method: "get",
      }),
  });

  const sendMessage = useMutation({
    mutationFn: () =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST}/global-chats`,
        method: "post",
        data: { user_id: userId, message: messageUser },
      }),
    onSuccess: (data) => {
      toast.success(data.detail);
      queryClient.invalidateQueries(["api", "users", "global-chats"]);
      queryClient.refetchQueries(["api", "users", "global-chats"]);
    },
    onError: (data) => toast.error(data.response.data.detail),
  });

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="w-full flex flex-col max-w-6xl h-full gap-6 py-12 ">
      <h1 className="text-center text-4xl font-bold mb-5">
        Global <span className="text-yellow-400">Chat</span>
      </h1>

      <Separator className="bg-yellow-400" />

      <div className="flex flex-col gap-10  mb-10 overflow-y-scroll">
        {data.detail.map((value, index) => {
          return (
            <div key={index}>
              <p className={`text-sm ml-14 mb-1 `}>{value.username}</p>
              <Message align="start">
                <MessageAvatar>
                  <Avatar>
                    <AvatarImage src="/avatars/10.png" alt="@me" />
                    <AvatarFallback>
                      {value.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent>
                  <Bubble>
                    <BubbleContent className={"bg-red-400"}>
                      {value.message}
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </div>
          );
        })}
      </div>

      <form
        className="flex gap-2 justify-center items-center fixed bottom-5  px-3 z-100 bg-[#010101] w-full left-0"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage.mutate();
        }}
      >
        <Input
          type="text"
          className=" h-10 max-w-6xl"
          onChange={(e) => setMessageUser(e.target.value)}
        />
        <Button
          variant="secondary"
          className={"w-15 h-10 "}
          disabled={sendMessage.isPending}
        >
          <SendHorizonal />{" "}
        </Button>
      </form>
    </div>
  );
}
