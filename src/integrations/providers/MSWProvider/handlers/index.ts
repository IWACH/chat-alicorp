import { setupWorker } from "msw/browser";

import { isBrowser } from "@/core/utils/isBrowser.util";

import { handlers } from "./handlers";

export const worker = isBrowser ? setupWorker(...handlers) : undefined;
