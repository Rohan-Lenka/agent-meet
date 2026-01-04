import { db } from "@/db";
import { agents } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const AgentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);
    // for testing error-state 
    // throw new TRPCError({ message: "error testing", code: "BAD_GATEWAY" })
    return data;
  }),
});
