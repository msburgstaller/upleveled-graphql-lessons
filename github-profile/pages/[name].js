import Head from "next/head";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
  useQuery,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: "Bearer 2f5e50cac6d0f021f177a8f68a82c47ad780efc9",
  },
});

const githubQuery = gql`
  query profileQuery($name: String!) {
    user(login: $name) {
      id
      login
      avatarUrl
      repositories(last: 10) {
        nodes {
          id
          name
        }
      }
    }
  }
`;

const Profile = (props) => {
  const { loading, error, data } = useQuery(githubQuery, {
    variables: {
      name: props.username,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oop something went wrong :(</p>;

  return (
    <div>
      <Head>
        <title>{data.user.login}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img src={data.user.avatarUrl} />
      <ul>
        {data.user.repositories.nodes.map((repo) => {
          return <li key={repo.id}>{repo.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default function Home(props) {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h1>Hello</h1>
        <Profile username={props.username} />
      </div>
    </ApolloProvider>
  );
}

export async function getServerSideProps(context) {
  return { props: { username: context.params.name } };
}
