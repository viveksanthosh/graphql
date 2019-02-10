import {
    GraphQLObjectType, GraphQLString, GraphQLInt,
    GraphQLSchema,
    GraphQLNonNull
} from 'graphql';

const dogs = [{
    name: 'Manzu',
    ownerid: 1,
    id: 1,
    publication: 'P1'
},
{
    name: 'Usha',
    ownerid: 2,
    id: 2
},
];


const owner = [{
    name: 'Vivek',
    id: 1,
},
{
    name: 'Asha',
    id: 2,
},
];


const OwnerSchema = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
    })
});

const DogSchema = new GraphQLObjectType({
    name: 'Dog',
    fields: () => ({
        ownerid: { type: GraphQLInt },
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        owner: {
            type: OwnerSchema,
            resolve: (parent, args) => {
                return dogs.find(a => a.id === parent.authorid)
            }
        }
    })
});


const RootQuerySchema = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        dog: {
            type: DogSchema,
            args: { id: { type: GraphQLInt } },
            resolve: (parent, args) => {
                return dogs.find(b => b.id === args.id)
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'AddDog',
    fields: {
        addDog: {
            type: DogSchema,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                ownerid: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let dog = { id: args.id, name: args.name, ownerid: args.ownerid };
                dogs.push(dog);
                return dog;
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuerySchema,
    mutation: Mutation
});

export { schema };