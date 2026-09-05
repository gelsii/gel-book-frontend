import HomePage from "@/pages/dashboard/HomePage";
import PostPage from "@/pages/dashboard/PostPage";
import ProfilePage from "@/pages/dashboard/ProfilePage";
import SettingsPage from "@/pages/dashboard/SettingsPage";
import { Button } from "@/components/ui/button";
import DashboardPages from "@/contexts/dashboardPages";
import {
  HomeIcon,
  Menu,
  MessageCircleIcon,
  Settings,
  ShieldHalf,
  SquarePen,
  User,
  X,
} from "lucide-react";
import React, { useContext, useState } from "react";
import GlobalChatPage from "@/pages/dashboard/GlobalChatPage";

export default function HeaderDashboard() {
  const [isOpenBar, setIsOpenBar] = useState(false);

  const { setDashboardPages } = useContext(DashboardPages);

  const navigations = [
    {
      name: "Home",
      Icon: <HomeIcon />,
      clickFn: () => setDashboardPages(<HomePage />),
    },
    {
      name: "Post",
      Icon: <SquarePen />,
      clickFn: () => setDashboardPages(<PostPage />),
    },
    {
      name: "Profile",
      Icon: <User />,
      clickFn: () => setDashboardPages(<ProfilePage />),
    },
    {
      name: "Global Chat",
      Icon: <MessageCircleIcon />,
      clickFn: () => setDashboardPages(<GlobalChatPage />),
    },
    {
      name: "Settings",
      Icon: <Settings />,
      clickFn: () => setDashboardPages(<SettingsPage />),
    },
  ];

  return (
    <header className="w-full sticky z-101 rounded-br-2xl rounded-bl-2xl backdrop-blur-sm h-15 top-0 px-7 md:px-10 lg:px-15 lg:h-16">
      <main className="w-full h-full flex justify-between items-center">
        <div className="flex gap-2 w-full">
          <ShieldHalf className="md:w-8 md:h-8" />
          <h1 className="text-lg font-bold md:text-2xl">Gel-Book</h1>
        </div>

        <div className="flex gap-3 justify-end w-full order-3">
          <div
            className="flex justify-end order-2  md:hidden"
            onClick={() => setIsOpenBar(!isOpenBar)}
          >
            {isOpenBar ? (
              <X className="h-8 w-8" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </div>
        </div>

        <nav className="w-full hidden justify-end gap-3 order-2 items-center md:flex lg:gap-8">
          {navigations.map((value, index) => {
            return (
              <Button
                variant="ghost"
                className={"w-32 h-10 text-base"}
                key={index}
                onClick={value.clickFn}
              >
                {value.Icon} {value.name}
              </Button>
            );
          })}
        </nav>
      </main>

      {isOpenBar && (
        <main className="fixed w-45 h-fit rounded-2xl border-2 bg-[#211f1f7c]  right-6 mt-2 ">
          <nav className="w-full h-full flex flex-col justify-around items-center gap-3 px-2 py-4">
            {navigations.map((value, index) => {
              return (
                <Button
                  variant="secondary"
                  className={"w-full h-10 justify-start pl-5  text-base"}
                  key={index}
                  onClick={value.clickFn}
                >
                  {value.Icon} {value.name}
                </Button>
              );
            })}
          </nav>
        </main>
      )}
    </header>
  );
}
