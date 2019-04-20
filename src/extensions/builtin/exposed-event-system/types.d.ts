export interface ExposedEventSystem {
  on(event: string, handler: (payload?: any) => void): number;
  off(event: string, ID: number): void;
  emit(event: string, payload?: any): void;
}