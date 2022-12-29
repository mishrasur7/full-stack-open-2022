import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { v1 as uuid } from "uuid";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import dotenv from 'dotenv'

import Person from "./models/Person.js";
dotenv.config()

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: "3d599470-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: "3d599471-3436-11e9-bc57-8b80ba54c431",
  },
];

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to database')
  })
  .catch((error) => {
    console.log(`Error connection to database ${error.message}`)
  })

const typeDefs = `#graphql
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  enum YesNo {
    YES
    NO
  }
  
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
        name: String!
        phone: String!
      ): Person
  }
`;
const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      // if (!args.phone) {
      //   return persons;
      // }
      // const byPhone = (person) =>
      //   args.phone === "YES" ? person.phone : !person.phone;
      // return persons.filter(byPhone);
      if(!args.phone) {
        return Person.find({})
      }
      return Person.find({ phone: { $exists: args.phone === 'YES' } })
    },
    findPerson: async (root, args) => Person.findOne({name: args.name}),
  },
  Person: {
    address: ({ street, city }) => {
      return {
        street,
        city,
      };
    },
  },
  Mutation: {
    addPerson: async (root, args) => {
      // if (persons.find((p) => p.name === args.name)) {
      //   throw new GraphQLError("Name must be unique!", {
      //     extensions: {
      //       code: "FORBIDDEN",
      //     },
      //   });
      // }

      const person = new Person({...args});
      return person.save();
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({name: args.name})
      person.phone = args.phone
      return person.save()

      // const updatedPerson = { ...person, phone: args.phone };
      // persons = persons.map((p) => (p.name === args.name ? updatedPerson : p));
      // return updatedPerson;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
