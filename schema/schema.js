const graphql = require('graphql');
const axios = require('axios');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLSchema
} = graphql;

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: {
			type: GraphQLString
		},
		firstName: {
			type: GraphQLString
		},
		age: {
			type: GraphQLInt
		}
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: {
				id: {
					type: GraphQLString
				}
			},
			resolve(parentValue, args) {
				axios.get(`http://localhost:3000/users/${args.id}`).then(resp => {
					console.log(resp.data);
					return resp.data;
				});
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
