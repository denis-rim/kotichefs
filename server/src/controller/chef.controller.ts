import { Request, Response } from "express";
import { getPromotedChefs } from "../service/chef.service";
import logger from "../utils/logger";

// Get all promoted chefs
export async function getPromotedChefsHandler(_req: Request, res: Response) {
  try {
    // Get promoted chefs
    const chefs = await getPromotedChefs();

    // If there are no chefs
    if (!chefs) {
      return res.status(404);
    }

    return res.send(chefs);
  } catch (err) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += "Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}
