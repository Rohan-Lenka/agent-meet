import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
        plot_no: z.number().min(6, { message: "number must be 3 digits long !" })
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text} & your plot number is ${opts.input.plot_no}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;