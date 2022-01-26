import { object, string, TypeOf } from "zod";

const paramsChefId = {
  params: object({
    chefId: string().optional(),
  }),
};

export const getChefInputSchema = object({
  ...paramsChefId,
});

export type GetChefInput = TypeOf<typeof getChefInputSchema>["params"];
