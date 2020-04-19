const { PORT } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    mongoose.connection.db.listCollections().toArray((err, names) => {
      if (err) {
        throw err;
      } else if (names.length > 0) {
        names.forEach(
          async collection =>
            await mongoose.connection.collections[collection.name].drop()
        );
      }
      app.listen(PORT, () =>
        console.log(`App is running on http://localhost:${PORT}`)
      );
    });
  })
  .catch(err => console.log(err));
