"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { EmptyState } from "@/components/empty-state";
import { columns } from "../components/columns";
import { useRouter } from "next/navigation";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";

export const AgentsView = () => {

  const router = useRouter();
  const trpc = useTRPC();
  const [filters, setFilters] = useAgentsFilters();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
    ...filters,
  }));

  return (
    <div className="flex flex-1 px-4 pb-4 md:px-8 flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact during the call."
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="Your AI agents are loading..."
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error loading Agents"
      description="Something went wrong, try again!"
    />
  );
};
