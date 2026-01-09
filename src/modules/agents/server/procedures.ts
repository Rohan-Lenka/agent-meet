import { db } from "@/db";
import { agents } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const AgentsRouter = createTRPCRouter({
  // will be changed later
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
          meetingCount: sql<number>`2`,
          ...getTableColumns(agents),
        })
        .from(agents)
        .where(eq(agents.id, input.id));
      return existingAgent;
    }),

  // will be changed later
  getMany: protectedProcedure.query(async () => {
    const data = await db
      .select({
        meetingCount: sql<number>`2`,
        ...getTableColumns(agents),
      })
      .from(agents);
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
