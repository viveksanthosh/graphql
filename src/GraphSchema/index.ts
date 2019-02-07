import {
    GraphQLObjectType, GraphQLString, GraphQLInt,
    GraphQLSchema, GraphQLID
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
    id: 1,
    publication: 'P2'
},
]

const BookSchema = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        publication: { type: GraphQLString },
        authorid: { type: GraphQLInt },
        name: { type: GraphQLString },
    })
});

const RootQuerySchema = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookSchema,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return books.find(b => b.id == args.id )
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuerySchema
});

export { schema };