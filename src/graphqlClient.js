import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://polar-harbor-28097.herokuapp.com/graphql';

export const client = new GraphQLClient(endpoint, { headers: {} });
