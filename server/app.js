const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express()

app.use(cors())

mongoose.connect('mongodb://jerry:codehead666@ds119734.mlab.com:19734/graphql-app');
mongoose.connection.once('open', () => {
	console.log('connected to database')
})


app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}))


app.listen(4000, () => {
	console.log('Listening for request on port 4000')
})