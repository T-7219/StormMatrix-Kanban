export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3003,
  
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME || 'board_db',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  },
  
  rabbitmq: {
    uri: process.env.RABBIT_MQ_URI || 'amqp://guest:guest@localhost:5672',
  },
  
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || '',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'devjwtsecret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  
  board: {
    defaultColumns: ['Backlog', 'To Do', 'In Progress', 'Review', 'Done'],
    maxBoardsPerUser: parseInt(process.env.MAX_BOARDS_PER_USER, 10) || 20,
    maxCardsPerBoard: parseInt(process.env.MAX_CARDS_PER_BOARD, 10) || 1000,
    defaultCardColors: [
      '#61bd4f', // green
      '#f2d600', // yellow
      '#ff9f1a', // orange
      '#eb5a46', // red
      '#c377e0', // purple
      '#0079bf', // blue
      '#00c2e0', // light blue
      '#51e898', // light green
      '#ff78cb', // pink
      '#344563', // dark blue
    ],
    autoArchiveCompletedCards: process.env.AUTO_ARCHIVE_COMPLETED_CARDS === 'true' || false,
    archiveAfterDays: parseInt(process.env.ARCHIVE_AFTER_DAYS, 10) || 30,
  }
});