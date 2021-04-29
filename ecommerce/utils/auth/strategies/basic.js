const passport = require("passport")
const { BasicStrategy } = require("passport-http")
const boom = require("boom")
const bcrypt = require("bcrypt")
const MongoLib = require("../../../lib/mongo")

passport.use(
  new BasicStrategy(async function(username, password, cb) {
    const mongoDB = new MongoLib()

    try {
      // Verify the existence of the user in the DB.
      const [user] = await mongoDB.getAll("users", { username })

      if (!user) {
        return cb(boom.unauthorized(), false)
      }

      // Compares the password encoded in the database with the password entered.
      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false)
      }

      return cb(null, user)
    } catch (error) {
      return cb(error)
    }
  })
)