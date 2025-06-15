// schema/schema.js
const { gql } = require('graphql-tag');
const bookResolver = require('../resolvers/bookResolver'); // existing
const authResolver = require('../resolvers/authResolver'); // authentication

const typeDefs = gql`
    type User {
        id: ID! 
        username: String!
        email: String
    }
    type SignupResponse {
        message: String! 
    }
    type AuthPayload {
        token: String
        message: String
    }
    type Book {
        id: ID! 
        title: String! 
        author: String! 
    }
    type Query {
        books: [Book!]!
        book(id: ID!): Book
    }
    type Mutation {
        signup(username: String!, password: String!, email: String): SignupResponse
        login(username: String!, password: String!): AuthPayload
        addBook(title: String!, author: String!): Book
        updateBook(id: ID!, title: String!, author: String!): Book
        deleteBook(id: ID!): SignupResponse
    }
 
`;

const resolvers = [authResolver, bookResolver]

module.exports = { typeDefs, resolvers };
