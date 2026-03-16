import { defineLive } from "next-sanity/live";
import { client } from "./client";
import { readToken } from "../env";

// Set up the live fetching helper
// This will be used in our pages to fetch data that updates in real-time
export const { sanityFetch, SanityLive } = defineLive({ 
  client: client.withConfig({ 
    // Live content requires a token with 'viewer' permissions or higher
    // This token should be kept server-side
    token: readToken,
  }) 
});
