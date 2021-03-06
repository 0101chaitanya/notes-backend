const bcrypt = require("bcrypt");

const User = require("../models/user");

describe('when there is initially one user in db', () => {
            beforeEach(async() => {
                await User.deleteMany({})

                const passwordHash = await bcrypt.hash('sekret', 10)
                const user = new User({ username: 'root', passwordHash })

                await user.save()
            })