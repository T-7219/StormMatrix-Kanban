export declare class AppController {
    getApiInfo(): {
        service: string;
        status: string;
        version: string;
        timestamp: string;
        endpoints: {
            boards: string;
            cards: string;
            columns: string;
            labels: string;
            health: string;
            metrics: string;
            docs: string;
        };
    };
}
