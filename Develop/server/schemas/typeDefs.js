const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        books: [Book]
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        me: User
        user(userId: ID!): User
        users: [User]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addBook(userId: ID!, description: String!, bookId: String!, image: String!, link: String!, title: String!): User
    }
`;

module.exports = typeDefs;