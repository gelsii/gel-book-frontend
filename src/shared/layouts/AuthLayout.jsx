import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  // const { data, isLoading, isError, error, isSuccess } = useQuery({
  //   queryKey: ["api", "users", "auth", "page"],
  //   queryFn: () =>
  //     UseAxios({
  //       url: `${import.meta.env.VITE_HOST}/auth/page`,
  //       method: "get",
  //       additonally: { withCredentials: true },
  //     }),
  //   refetchInterval: 0,
  // });

  // if (isError) {
  //   console.log(error?.response);
  // }

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  return <div className="w-full h-full">{<Outlet />}</div>;
}
