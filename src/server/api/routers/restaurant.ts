import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "@/server/db";

export const restaurantRouter = router({
  getRestaurants: publicProcedure
  .input(
    z.object({
      keyword: z.string().optional(),
    })
  )
  .query(async ({input}) => {
    return await prisma.restaurant.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      where: input.keyword
        ? {
            name: {
              contains: input.keyword,
              mode: "insensitive",
            },
          }
        : undefined
    });
  }),

  addFavorite: publicProcedure
    .input(z.object({ id: z.string(), isFavorite: z.boolean() }))
    .mutation(async ({ input }) => {
      return await prisma.restaurant.update({
        where: { id: input.id },
        data: { isFavorite: !input.isFavorite },
      });
    }),
});
