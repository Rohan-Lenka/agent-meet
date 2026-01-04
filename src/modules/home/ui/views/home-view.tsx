"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function HomeView() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Rohan", plot_no: 123123 }));

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <p>Logged in as {session?.user.name}</p>
      <p>{data?.greeting}</p>

      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/sign-in"); 
              },
            },
          })
        }
      >
        Sign Out
      </Button>
    </div>
  );
}