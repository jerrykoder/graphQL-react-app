const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

const { 
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLSchema, 
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = graphql

var books = [
	{ name: 'Hello 1', genre: 'horror', id: '1', authorId: '1' },
	{ name: 'Hello 2', genre: 'horror', id: '2', authorId: '1' },
	{ name: 'Hello 3', genre: 'horror', id: '3', authorId: '1' }
]

var authors = [
	{ name: 'Hello12', age: 32, id: '1' },
	{ name: 'Hello3', age: 12, id: '2' },
	{ name: 'Hello12', age: 32, id: '3' }
]

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id:    { type: GraphQLID },
		name:  { type: GraphQLString },
		genre: { type: GraphQLString },
		authorId: { type: GraphQLID },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				//console.log(parent);
				//return _.find(authors, { id: parent.authorId})
				return Author.findById(parent.authorId)
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id:    { type: GraphQLID },
		name:  { type: GraphQLString },
		age:   { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				//console.log(parent);
				//return _.filter(books, { authorId: parent.id})
				return Book.find({authorId: parent.id })
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve( parent, args ) {
				//Code to get data from db/other source
				//return _.find(books, {id: args.id })
				return Book.findById(args.id)
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve( parent, args ) {
				//Code to get data from db/other source
				//return books
				return Book.find({})
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve( parent, args ) {
				//Code to get data from db/other source
				//return _.find(authors, {id: args.id })
				return Author.findById(args.id)
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve( parent, args ) {
				//Code to get data from db/other source
				//return authors
				return Author.find({})
			}
		}
	}
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name:  { type: new GraphQLNonNull(GraphQLString) },
				age:   { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve(parent, args){
				let author = new Author({
					name: args.name,
					age: args.age
				})
				return author.save()
			}
		},
		addBook: {
			type: BookType,
			args: {
				name:  { type: new GraphQLNonNull(GraphQLString) },
				genre:   { type: new GraphQLNonNull(GraphQLString)},
				authorId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args){
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				})
				return book.save()
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})