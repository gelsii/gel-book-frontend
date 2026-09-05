import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "@/utils/useAxios";
import CardPostsComponent from "@/components/CardPostsComponent";
import { LoadingComponents } from "@/components/LoadingComponents";

export default function HomePage() {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["api", "users", "posts"],
    queryFn: () =>
      UseAxios({
        url: `${import.meta.env.VITE_HOST}/posts?audience=private`,
        method: "get",
      }),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col overflow-y-hidden  mt-15 justify-start items-center h-full w-full">
        <div className="grid gap-10 w-full max-w-sm md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <LoadingComponents
            length={10}
            classnames={"h-90 max-w-sm rounded-xl"}
          />
        </div>
      </div>
    );
  }

  return (
    <section className="w-full h-full justify-start items-center ">
      <h1 className="my-5 text-2xl text-white text-center">Home</h1>
      <div className="grid gap-15 lg:grid-cols-3 md:grid-cols-2 lg:gap-x-5 lg:gap-y-10 xl:grid-cols-4 ">
        <CardPostsComponent data={data.detail} />
      </div>
    </section>
  );
}
