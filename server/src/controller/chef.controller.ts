import { Request, Response } from "express";
import {getChefById, getAllChefs, getPromotedChefs} from "../service/chef.service";
import logger from "../utils/logger";
import {GetChefInput} from "../validation/chef.validationSchema";

// Get all promoted chefs
export async function getPromotedChefsHandler(_req: Request, res: Response) {
  try {
    // Get promoted chefs
    const chefs = await getPromotedChefs();

    // If there are no chefs, return 404
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

// Get all chefs
export async function getAllChefsHandler(_req: Request, res: Response) {
  try {
    // Get all chefs
    const chefs = await getAllChefs();

    // If there are no chefs, return 404
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

// Get chef by id
export async function getChefByIdHandler(req: Request<GetChefInput>, res: Response) {
  try {
    const chefId = req.params.chefId;

    if (!chefId) {
      return res.status(400).send("Missing chef id.");
    }

    // Get chef by id
    const chef = await getChefById(chefId);

    // If there is no chef, return 404
    if (!chef) {
      return res.status(404);
    }

    return res.send(chef);
  } catch (err) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += "Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}