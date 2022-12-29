import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv'
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

import Book from "./models/Book.js";
import Author from "./models/Author.js";
import User from "./models/User.js";

dotenv.config()

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to database`)
  }).catch((error) => {
    console.log(`Error connecting to database: ${error.message}`)
  })

const typeDefs = `#graphql
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
    }

    type User {
      username: String!
      favrouriteGenre: String!
      id: ID!
    }

    type Token {
      value: String!
    }
    
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genres: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String]!
        ): Book

        editAuthor(
          name: String!, 
          setBornTo: Int!
          ): Author

        createUser(
          username: String!
          favrouriteGenre: String!
        ): User

        login(
          username: String!
          password: String!
        ): Token

    }
  `;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books =  await Book.find({}).populate('author')
      return books
      // return books.filter((book) => {
      //   if (args.author) {
      //     return args.author ? book.author === args.author : book;
      //   } else if (args.genres) {
      //     return book.genres.includes(args.genres)
      //       ? book.genres.map((genre) => genre)
      //       : book;
      //   } else {
      //     return book;
      //   }
      // });
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      console.log("root", root.name);
      return await Book.find(book => book.author === root.name).length
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if(!currentUser) {
        throw new GraphQLError('User not authenticated!')
      }

      const author = await Author.findOne({name: args.author})
      
      if(!author) {
        const newAuthor = new Author({
          name: args.author,
          born: null
        })
        try {
          await newAuthor.save()
        } catch(error) {
          throw new GraphQLError(error.message)
        }
      }

      const book = new Book({...args})
      try {
        await book.save()
      } catch(error) {
        throw new GraphQLError(error.message)
      }
      await book.save()

      return book
    },
    editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser

        if(!currentUser) {
          throw new GraphQLError('User not authenticated!')
        }

        const author = await Author.findOne({name: args.name})

        if(!author) {
            return null
        }

        try {
          await Author.findOneAndUpdate(author, {$set: {born: args.setBornTo}})
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: {code: 'BAD_USER_INPUT'}
          })
        }
        
        const updated = await Author.findOne({born: args.setBornTo})
        return updated
    }, 
    createUser: async (root, args) => {
      console.log('args', args)
      const newUser = new User({...args})
      console.log(newUser)
      try {
        await newUser.save()
      } catch (error) {
        throw new GraphQLError(error.message)
      }

      return newUser
    }, 
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if ( !user || args.password !== 'mypassword' ) {
        throw new GraphQLError("Wrong credentials!")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authorization = req ? req.headers.authorization : null
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        authorization.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
