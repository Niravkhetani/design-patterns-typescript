export interface OrderState {
  readonly name: string;
  canTransitionTo(targetName: string): boolean;
  getAvailableActions(): string[];
}
