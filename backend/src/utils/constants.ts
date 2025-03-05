import env from "../config/environment.js";

export const WHITELIST_DOMAINS = [env.FRONTEND_URL];

export const WHITELIST_ROUTES = ["/login", "/signup"];
