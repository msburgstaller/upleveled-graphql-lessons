import React from "react";
import { gql, useQuery } from "@apollo/client";

const profileQuery = gql`
  query($first: Int!) {
    viewer {
      login
      avatarUrl
      company

      repositories(first: $first) {
        nodes {
          name
          createdAt
          defaultBranchRef {
            name
          }
        }
      }
    }
  }
`;

function App() {
  const first = parseInt(window.location.search.replace("?first=", ""));
  const { loading, error, data } = useQuery(profileQuery, {
    variables: { first },
  });

  if (loading) return "Loading …";
  if (error) return "Something went wrong!";

  return (
    <div className="App">
      <img src={data.viewer.avatarUrl} height="200" alt="Profile" />
      <p>{data.viewer.company}</p>
      <ul>
        {data.viewer.repositories.nodes.map((repo) => {
          return <li key={repo.id}>{repo.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
