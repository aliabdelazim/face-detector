const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connection has been established successfully.'))
.catch(error => {
  console.error('Unable to connect to the database:', error);
  process.exit(1);
});

module.exports = mongoose.connection;

