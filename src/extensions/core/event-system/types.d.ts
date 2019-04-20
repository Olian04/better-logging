export interface EventSystemConfig {
  on: {
    [event: string]: (payload: any) => void;
  }
}