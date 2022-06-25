const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const app =  require("./server.js");
const { Sequelize } = require("sequelize-cockroachdb");

const Comments = require("./Comments/Models/commentsTable");
const User = require("./User/Models/userTable");
const Moderator = require("./Moderator/Models/moderatorTable");
const Post = require("./Post/Models/postTable");
const Review = require("./Review/Models/reviewTable");
const Notification = require("./Notification/Models/notificationTable");
const PhoneVerificationTable = require("./Verify/Models/phoneVerificationTable");
const EmailVerificationTable = require("./Verify/Models/emailVerificationTable");

const moderatorTask = require("./Moderator/moderatorCheck.cron");

// dotenv.config();

const port = process.env.PORT || 8000;
const host = process.env.HOST || "localhost";

const sequelize = new Sequelize(process.env.DATABASE_URL);

(async () => {
  try {
    // const [results, metadata] = await sequelize.query("SELECT NOW()");
    // console.log(results);
    await Comments.sync({ force: false });
    await User.sync({ force: false });
    await Moderator.sync({ force: false });
    await Post.sync({ force: false });
    await Review.sync({ force: false });
    await Notification.sync({ force: false });
    await PhoneVerificationTable.sync({ force: false });
    await EmailVerificationTable.sync({ force: false});
    // await Comments.drop();
    // await User.drop();
    // await Moderator.drop();
    // await Post.drop();
    // await Review.drop();
    // await Notification.drop();
    // console.log(result);

  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    await sequelize.close();
  }
})();

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
    }
);


moderatorTask.start();
