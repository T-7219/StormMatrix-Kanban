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
    jwt: {
        secret: string;
        expiresIn: string;
        refreshExpiresIn: string;
    };
    redis: {
        host: string;
        port: number;
        password: string;
    };
    rabbitmq: {
        uri: string;
    };
    admin: {
        email: string;
        password: string;
    };
};
export default _default;
