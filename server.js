// server.js
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { typeDefs, resolvers } = require("./schema/schema");
const connectDB = require("./config/db");
const { getUserFromToken } = require("./auth/auth");

require('dotenv').config();

const startServer = async () => {
    const app = express();

    await connectDB();

    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();

    app.use('/graphql',
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const authHeader = req.headers.authorization || '';
                const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : '';
                const currentUser = token ? getUserFromToken({ headers: { authorization: `Bearer ${token}` } }) : null;

                return { currentUser }; // <- now we have currentUser directly
            }
        })
    );

    app.listen(4000, () => {
        console.log('🚀 Server ready at http://localhost:4000/graphql');
    });
};

startServer();