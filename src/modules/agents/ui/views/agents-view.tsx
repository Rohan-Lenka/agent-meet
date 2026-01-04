"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError, error } = useQuery(
    trpc.agents.getMany.queryOptions()
  );

  if (isLoading) {
    return (
      <LoadingState
        title="Loading Agents"
        description="Your AI agents are loading..."
      />
    );
  }

  if (isError) {
    return (
      <ErrorState title="Error loading agents" description="Please try again" />
    );
  }

  return <div>{JSON.stringify(data, null, 2)}</div>;
};
