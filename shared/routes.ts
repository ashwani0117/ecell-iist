import { z } from "zod";

export const api = {
  // We keep this minimal since the app is static and uses client-side data
  health: {
    method: "GET",
    path: "/api/health",
    responses: {
      200: z.object({ status: z.string() }),
    },
  },
};
