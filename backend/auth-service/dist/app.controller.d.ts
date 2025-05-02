export declare class AppController {
    getApiInfo(): {
        service: string;
        status: string;
        version: string;
        timestamp: string;
        endpoints: {
            auth: string;
            health: string;
            admin: string;
            metrics: string;
            docs: string;
        };
    };
}
