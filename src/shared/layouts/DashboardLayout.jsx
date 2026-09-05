import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderDashboard from "../components/HeaderDashboard";
import { useQuery } from "@tanstack/react-query";
import userIdContext from "@/contexts/userId";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UseAxios from "@/utils/useAxios";
import { LoadingComponents } from "@/components/LoadingComponents";
import enabledAuthPageContext from "@/contexts/enabledAuthPage";

export default function DashboardLayout() {
  const { setUserId } = useContext(userIdContext);
  const { setIsEnableAuthPage } = useContext(enabledAuthPageContext);

  const { data, isError, error, isPending, isSuccess } = useQuery({
    queryKey: ["api", "users", "access"],
    retry: 0,
    queryFn: async () => {
      const dataResponse = await UseAxios({
        url: `${import.meta.env.VITE_HOST}/access`,
        method: "post",
        additonally: { withCredentials: true },
      });

      setUserId(dataResponse.detail.user);

      setIsEnableAuthPage(false);

      return dataResponse;
    },
  });

  if (isPending) {
    return (
      <div className="flex flex-col gap-10 overflow-hidden justify-start items-center h-full w-full">
        <LoadingComponents
          length={1}
          classnames={"h-20 w-full rounded-tl-none rounded-tr-none"}
        />

        <div className="grid w-full max-w-sm gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <LoadingComponents
            length={10}
            classnames={"h-90 max-w-md rounded-xl"}
          />
        </div>
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <ForhibenPage status={"403"} message={error?.response?.data.detail} />
    );
  }

  return (
    <>
      {isSuccess && (
        <main className="w-full h-full no-scrollbar overflow-x-hidden ">

          <HeaderDashboard />
          <div className="grid place-items-center">
            <Outlet />
          </div>
        </main>
      )}
    </>
  );
}

const ForhibenPage = ({ message, status }) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle className={"text-white max-w-sm text-4xl"}>
          {status} - {message}
        </EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for
          what you need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to={"/auth/signin"}>
          <Button variant="secondary">Sign in account</Button>
        </Link>
        <EmptyDescription>
          Need help? <Link to={""}>Contact Us</Link>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
};
