declare const _default: () => {
    nodeEnv: string;
    port: number;
    database: {
        host: string;
        port: number;
        name: string;
        username: string;
        password: string;
    };
    rabbitmq: {
        uri: string;
    };
    redis: {
        host: string;
        port: number;
        password: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    board: {
        defaultColumns: string[];
        maxBoardsPerUser: number;
        maxCardsPerBoard: number;
        defaultCardColors: string[];
        autoArchiveCompletedCards: boolean;
        archiveAfterDays: number;
    };
};
export default _default;
