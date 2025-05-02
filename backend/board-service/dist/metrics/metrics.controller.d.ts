import { Counter, Gauge } from 'prom-client';
export declare class MetricsController {
    private readonly boardsCreatedCounter;
    private readonly cardsCreatedCounter;
    private readonly activeBoardsGauge;
    private readonly cardMovementsCounter;
    constructor(boardsCreatedCounter: Counter<string>, cardsCreatedCounter: Counter<string>, activeBoardsGauge: Gauge<string>, cardMovementsCounter: Counter<string>);
    getMetrics(): string;
    incrementBoardCreated(): void;
    incrementCardCreated(): void;
    incrementCardMovement(): void;
    updateActiveBoards(count: number): void;
}
