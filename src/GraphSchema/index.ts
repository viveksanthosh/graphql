import {
    GraphQLObjectType, GraphQLString, GraphQLInt,
    GraphQLSchema
} from 'graphql';

const books = [{
    name: '12 roles for life',
    authorid: 1,
    id: 1,
    publication: 'P1'
},
{
    name: '14 roles for life',
    authorid: 2,
    id: 2,
    publication: 'P2'
},
];


const authors = [{
    name: 'Jordan',
    id: 1,
    publications: 100
},
{
    name: 'Not Jordan',
    id: 2,
    publications: 5
},
];


const AuthorSchema = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        publications: { type: GraphQLString },
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
    })
});

const BookSchema = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        publication: { type: GraphQLString },
        authorid: { type: GraphQLInt },
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        author: {
            type: AuthorSchema,
            resolve: (parent, args) => {
                return authors.find(a => a.id === parent.authorid)
            }
        }
    })
});


const RootQuerySchema = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookSchema,
            args: { id: { type: GraphQLInt } },
            resolve: (parent, args) => {
                return books.find(b => b.id === args.id)
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuerySchema
});

export { schema };