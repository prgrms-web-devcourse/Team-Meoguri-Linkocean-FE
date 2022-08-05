/* eslint-disable import/prefer-default-export */

import { setupWorker } from "msw";
import { handlers } from "./handlers";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const worker = setupWorker(...handlers);
