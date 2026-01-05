import { db } from "@/db";
import { agents } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schemas";

export const AgentsRouter = createTRPCRouter({
  // change to protectedProcedure later
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);
    // for testing error-state
    // throw new TRPCError({ message: "error testing", code: "BAD_GATEWAY" })
    return data;
  }),
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();
      return createdAgent;
    }),
});
