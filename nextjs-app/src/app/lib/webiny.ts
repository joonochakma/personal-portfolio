
// lib/webiny.ts

import { GraphQLClient } from "graphql-request";

export const webiny = new GraphQLClient(
  process.env.NEXT_PUBLIC_WEBINY_API!,
  {
    headers: {
      Authorization: `Bearer ${process.env.WEBINY_API_TOKEN}`,
    },
  }
);