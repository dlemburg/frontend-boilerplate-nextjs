import { createClient, Provider } from 'urql';

export const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL as string,
  fetchOptions: () => {
    const token = 'SOME_AUTH_TOKEN';

    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});
