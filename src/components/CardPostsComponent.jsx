import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CircleUser,
  Ellipsis,
} from "lucide-react";
import DropDownMenuPost from "@/components/DropDownMenuPost";

import HeartButtonComponent from "@/components/HeartButtonComponent";
import CardCommentComponent from "./CardCommentComponent";

export default function CardPostsComponent({ data }) {
  return (
    <>
      {data.map((value, index) => {
        return (
          <Card
            className="mx-auto w-full bg-[#] shadow-2xl max-w-sm "
            key={index}
          >
            <CardHeader className={"flex justify-between items-start"}>
              <div>
                <CardDescription className={"flex gap-1 items-center"}>
                  <CircleUser /> {value.email}
                </CardDescription>
                <CardTitle className={"mt-4"}>{value.title}</CardTitle>
              </div>
              <div>
                <DropDownMenuPost
                  button={
                    <p>
                      <Ellipsis />
                    </p>
                  }
                  id={value._id}
                  title={value.title}
                  description={value.description}
                  audience={value.audience}
                />
              </div>
            </CardHeader>
            <CardContent className="-mb-(--card-spacing) h-full max-h-70">
              <div className="-mx-(--card-spacing) no-scrollbar h-full space-y-4 overflow-y-scroll border-t bg-muted/50 px-(--card-spacing) py-4 text-sm leading-relaxed">
                <p className="h-full">{value.description}</p>
              </div>
            </CardContent>
            <CardFooter className="justify-end  gap-2 bg-[#]">
              <HeartButtonComponent
                post_id={value._id}
                countsHeart={value.heart}
              />
              <CardCommentComponent
                post_id={value._id}
                commentsInPost={value.comments}
              />
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}
