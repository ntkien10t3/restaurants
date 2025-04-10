import { initTRPC } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createTRPCContext(_opts: FetchCreateContextFnOptions) {
  return {};
}

const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
