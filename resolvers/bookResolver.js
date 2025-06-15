// resolvers / bookResolver.js
const Book = require('../models/Book');
const { ApolloError } = require('@apollo/server');

const bookResolver = {
    Query: {
        books: async (_, __, { currentUser }) => {
            if (!currentUser) {
                throw new ApolloError('Not authenticated!', 'UNAUTHENTICATED');
            }
            return await Book.find({});
        },
        book: async (_, { id }, { currentUser }) => {
            if (!currentUser) {
                throw new ApolloError('Not authenticated!', 'UNAUTHENTICATED');
            }
            return await Book.findById(id);
        }
    },
    Mutation: {
        addBook: async (_, { title, author }, { currentUser }) => {
            if (!currentUser) {
                throw new ApolloError('Not authenticated!', 'UNAUTHENTICATED');
            }
            if (!title || !author) {
                throw new Error('Title and author are required');
            }
            const book = new Book({ title, author });
            await book.save();
            return book;
        },
        updateBook: async (_, { id, title, author }, { currentUser }) => {
            if (!currentUser) {
                throw new ApolloError('Not authenticated!', 'UNAUTHENTICATED');
            }
            if (!title || !author) {
                throw new Error('Title and author are required');
            }
            return await Book.findByIdAndUpdate(id, { title, author }, { new: true });
        },
        deleteBook: async (_, { id }, { currentUser }) => {
            if (!currentUser) {
                throw new ApolloError('Not authenticated!', 'UNAUTHENTICATED');
            }
            await Book.findByIdAndDelete(id);
            return { message: "Book successfully deleted" };
        }
    }
};

module.exports = bookResolver;