import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "@/server/db";

export const restaurantRouter = router({
  getRestaurants: publicProcedure.query(async () => {
    return await prisma.restaurant.findMany();
  }),

  addFavorite: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.restaurant.update({
        where: { id: input.id },
        data: { isFavorite: true },
      });
    }),
});
