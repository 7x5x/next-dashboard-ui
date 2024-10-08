import type { NextApiResponse } from "next";

export const handleError = (res: any, error: unknown): void => {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(400).json({ error: "An unknown error occurred." });
  }
};
