const { User } = require("../models/index");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({});
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },

    user: async (parent, { userId }) => {
      const user = await User.findOne({ _id: userId });
      return user;
    },

    users: async () => {
      return User.find().select("-__v");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addBook: async (
      parent,
      { userId, description, bookId, image, link, title },
      context
    ) => {
      if (context.user) {
        const updateBooks = await User.findOneAndUpdate(
          { _id: userId },
          { $push: { books: { description, bookId, image, link, title } } },
          { new: true }
        );
        return updateBooks;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
