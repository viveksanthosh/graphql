// import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql';

// const BookSchema = new GraphQLObjectType({
//     name: 'BookType',
//     fields: () => ({
//         author: { type: GraphQLString }
//     })
// })

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         book: {
//             type: BookSchema,
//             args: { id: { type: GraphQLString } },
//             resolve: (parent, args) => {
//                 console.log(args);
//                 return ({
//                     author: 'Vivek'
//                 })
//             }
//         }
//     }
// });

// const schema = new GraphQLSchema({
//     query: RootQuery
// });

// export { schema };




