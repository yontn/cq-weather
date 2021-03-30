import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

export const apollo = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({ addTypename: false }),
});
