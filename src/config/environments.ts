export const environments = {
  local: {
    AMQP_HOST: process.env.AMQP_HOST || 'localhost',
    AMQP_PORT: Number(process.env.AMQP_PORT) || 5672,
    AMQP_USER: process.env.AMQP_USER || 'admin',
    AMQP_PASSWORD: process.env.AMQP_PASSWORD || 'admin',
  },
};
