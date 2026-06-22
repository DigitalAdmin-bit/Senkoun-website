import axios, { type AxiosInstance } from "axios";

const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.senkoun.co.uk";

/**
 * Axios instance for internal (HR) use.
 * Uses STRAPI_INTERNAL_TOKEN — a separate, higher-privilege Strapi API token.
 * NEVER import this in any public-facing code.
 */
const internalApi: AxiosInstance = axios.create({
    baseURL: `${STRAPI_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_INTERNAL_TOKEN}`,
    },
});

export { STRAPI_URL };
export default internalApi;
