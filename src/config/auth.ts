export default {
  jwt: {
    secret: process.env.JWT_APP_SECRET,
    expiresIn: '60m'
  }
};
