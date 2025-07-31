import z from "zod";

export const filterParamsSchema = z.object({
  sort: z.enum(["asc", "desc", "popular"]).optional(),
  priceRange: z.enum(["25", "50", "100"]).optional(),
});

export type FilterParamsType = z.infer<typeof filterParamsSchema>;