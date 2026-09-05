import userIdContext from "@/contexts/userId";
import UseAxios from "@/utils/useAxios";
import { useQuery } from "@tanstack/react-query";
import { CircleUser, Ellipsis } from "lucide-react";
import React, { useContext } from "react";
import { Separator } from "@/components/ui/separator";
import CardPostsComponent from "../../components/CardPostsComponent";

export default function ProfilePage() {
  const { userId } = useContext(userIdContext);

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["api", "users", "profile"],
    queryFn: () =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST}/profile?id=${userId}`,
        method: "get",
      }),
  });

  if (isError) {
    console.log(error?.response);
  }

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <section className="w-full max-w-4xl h-full grid place-items-center">
      <main className="flex flex-col mb-2 justify-center items-center w-full mt-10">
        <CircleUser color="#cfcf1a" className="w-25 h-25 lg:w-40 lg:h-40" />
        <h1 className="text-xl w-full text-center text-white mb-1 font-bold mt-2">
          @{data?.detail?.username}
        </h1>


        {/* <div><Ellipsis color="white" /></div> */}
      </main>

      <Separator  />

      <h2 className="w-full text-xl mt-3 text-[#fcf738]">Posts:</h2>

      <div className="w-full h-full mt-10 pb-7 grid gap-10 md:grid-cols-2">
        <CardPostsComponent data={data.detail.posts} />
      </div>
    </section>
  );
}
