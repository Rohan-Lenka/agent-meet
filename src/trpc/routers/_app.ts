import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { AgentsRouter } from '@/modules/agents/server/procedures';
import { MeetingsRouter } from '@/modules/meetings/server/procedures';
export const appRouter = createTRPCRouter({
  // this is for testing
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
        plot_no: z.number().min(6, { message: "plot number must be 3 digits long !" })
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text} & your plot number is ${opts.input.plot_no}`,
      };
    }),
    agents: AgentsRouter,
    meetings: MeetingsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;