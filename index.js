const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const { MONGODB_URI, PORT } = require('./middleware/config')

const resolvers = require('./schema/rootResolver')
const typeDefs = require('./schema/rootTypeDefs')

const context = require('./middleware/context')

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to database: ', error.message))

const server = new ApolloServer({ typeDefs, resolvers })

startStandaloneServer(server, {
  listen: { port: PORT },
  context
}).then(({ url }) => console.log(`Server running at ${url}`))
