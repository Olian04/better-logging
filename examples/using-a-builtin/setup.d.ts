import { ExposedEventSystem } from "../../src/extensions/builtin/exposed-event-system/types";

declare global {
  interface Console extends ExposedEventSystem {}
}
