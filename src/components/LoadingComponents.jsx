import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingComponents({ classnames, length }) {
  const items = [1, 2, 3, 4];
  
  return (
    <>
      {Array.from({ length: length }).map((value, index) => {
        return (
          <Card className={`w-full ${classnames}`} key={index}>
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="aspect-video w-full" />
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
