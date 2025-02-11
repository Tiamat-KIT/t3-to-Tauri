/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    watchOptions: {
        pollIntervalMs: 3000
    },
    webpack: (_,config) => {
        config.config.watchOptions = {
            pollIntervalMs: 3000
        }
        return config
    }
};

export default config;
