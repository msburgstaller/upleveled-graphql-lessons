# Lesson: GraphQL Intro & Client

## Intro

- Severin Burgstaller (Twitter: @ms_burgstaller)
- Studied Computer Science at University of Vienna
- Former Co-Organiser of GraphQL Vienna (MeetUp)
- Freelancing / Consulting (Erste Group, George, GE, EVVA, ...)
- Material based on https://github.com/nikgraf/upleveled-lessons by Nik Graf

## Who are you?

One-two sentence each

## Data fetching & APIs

### What did you do so far?

Data fetching via HTTP

- https://egghead.io/api/v1/instructors/nik-graf/lessons
- https://egghead.io/api/v1/instructors/nik-graf/series
- https://orf.at/static-extras/bulawindow.json

Show fetching an requestion data in the browser?
-> https://egghead.io/instructors/nik-graf

Why? We are storing and interacting with data. We want to retrieve it and store it on the server (so we can access it not only on one client - think about Twitter, but without Tweets of your friends).

- Different methodologies
- APIs can be use-case oriented, (rather) generic or both
- Other API methodologies: SOAP, RPC, CORBA, Queue based, ...
- REST: commonly entity based data fetching over HTTP
  - Attention: RESTful APIs are very flexible, there's not "the way" to design a REST API
  - Mostly based on HTTP methods (GET/POST/PUT/PATCH/DELETE)
  - Can be classified in a maturity model (e.g. it's still a REST API with just a GET endpoint)
  - See https://de.wikipedia.org/wiki/Representational_State_Transfer#Richardson_Maturity_Model for details

## GraphQL

- Initiated by Facebook
- Docs: https://graphql.org
- Flexible, generic way to interact with data.
- Can be served over HTTP
  - Then related to REST in the maturity model as Level 0
  - Usually uses one endpoint `/graphql` when served over HTTP
- Schema & Query based
- Just ask for the data you need based on the schema you got
- Strict separation between querying and mutating data
- Also defines subscriptions for real-time interaction
- Sometimes integral part of other tools, then not always served over HTTP, i.e.
  - Prisma uses GraphQL Schemas for database definition
  - Gatsby uses GraphQL as a query language

-> See presentation.pdf

# Exercise

_Hint_: Using CTRL + Space you can autocomplete fields in the GraphQL IDE.

1. Use the StarWars GraphQL API `https://graphql.github.io/swapi-graphql/` to query:

_Hint_: The schema has some duplications of data e.g. people & edges.node contain the same data. Nik will explain why so!

- Query all People
- Query the names of all Starships related to Luke Skywalker!

_Hint_: Get Luke by his id, which you can get from `allPeople`.

- Query the population and all the residents on the planet Naboo.

2. Use the Github GraphQL API `https://developer.github.com/v4/explorer/` (embded GraphiQL) to query

- Your repositories (first 10)
- Extend the query to show the default branch of each repository

Other public APIs to play around with https://github.com/APIs-guru/graphql-apis

## Query data

- We're going to use Apollo GraphQL's libraries and tools going forward
  - Most widely used in the GraphQL space
  - Fairly stable
  - Broad community
- There are others, too (e.g. Relay from Facebook)

Create new app with `yarn create react-app app` and go through
https://www.apollographql.com/docs/react/get-started/

## Make use of GraphQL

Build you own Profile page based on Github e.g. https://github.com/msburgstaller using the Github GraphQL Endpoint

- Show your name
- Show your Github Avatar
- Show a list of (public) repositories

1. Generate an access token:
   https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token

_Hint_: You can use the `boilerplate` provided in this repository as a starter.

_Hint_:

- `yarn add @apollo/client graphql`

```js
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: "Bearer TODO",
  },
});
```

```jsx
<ApolloProvider client={client}>…</ApolloProvider>
```

```jsx
import { gql, useQuery } from "@apollo/client";

const profileQuery = gql`
  TODO YOUR QUERY
`;

export default function Profile(props) {
  const { loading, error, data } = useQuery(profileQuery);

  return null; // TOOD render your component
}
```

## Using Variables

Make the username dynamic and allow to fetch the profile based on the url.

When visiting the `profile/:username` route use the route to fetch data for only the one specific route.

_Hint_: Fetch one place first with a hard coded ID to see if it works and then extend it to use GraphQL variables for the profile username to always fetch the correct profile.

_Hint_:

```jsx
const { loading, error, data } = useQuery(placeQuery, { variables: {} });
```
