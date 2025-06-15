// resolvers / authResolver.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../auth/auth');
const { ApolloError } = require('@apollo/server');

const authResolver = {
    Mutation: {
        signup: async (_, { username, password, email }) => {
            if (await User.findOne({ username })) {
                throw new ApolloError('Username already taken!', 'CONFLICT');
            }
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }
            const user = new User({ username, password, email });
            await user.save();

            return { message: 'Signup successfully' };
        },

        login: async (_, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new ApolloError('Invalid credentials!', 'UNAUTHENTICATED');
            }
            const isValid = await user.isValidPassword(password);
            if (!isValid) {
                throw new ApolloError('Invalid credentials!', 'UNAUTHENTICATED');
            }
            const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1d' });

            return { token, message: "Login successfully" };
        },
    }
};

module.exports = authResolver;