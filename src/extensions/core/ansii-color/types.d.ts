import { Chalk, ColorSupport } from 'chalk';
type ChalkColor = Chalk & {
  supportsColor: ColorSupport;
}

export interface AnsiiColorConfig {
  color: Partial<{
    base: ChalkColor,
    type: Partial<{
      debug: ChalkColor,
      info: ChalkColor,
      log: ChalkColor,
      error: ChalkColor,
      warn: ChalkColor,
    }>
  }>
}