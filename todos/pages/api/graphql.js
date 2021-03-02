require("dotenv").config();
const postgres = require("postgres");
const sql = postgres();
import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(username: String): User

    todos(filterChecked: Boolean): [Todo!]!
    todo(id: Int!): Todo
  }

  type Mutation {
    createTodo(title: String!, checked: Boolean): Todo
  }

  type Todo {
    id: Int!
    title: String!
    checked: Boolean!
  }

  type User {
    name: String
    username: String
  }
`;

const users = [
  { name: "Leeroy Jenkins", username: "leeroy" },
  { name: "Foo Bar", username: "foobar" },
];

const todos = [
  { id: 0, title: "Static Todo", checked: false },
  { id: 1, title: "Second Static Todo", checked: true },
];

async function getTodos() {
  return await sql`select * from todos`;
}

async function getFilteredTodos(checked) {
  return await sql`select * from todos WHERE checked = ${checked}`;
}

async function getTodo(id) {
  const result = await sql`select * from todos WHERE id = ${id}`;
  return result[0];
}

async function createTodo(title, checked) {
  const result = await sql`INSERT INTO todos (title, checked)
  VALUES (${title}, ${checked}) RETURNING id, title, checked;`;
  return result[0];
}
const resolvers = {
  Query: {
    todos: (parent, { filterChecked = null }) => {
      if (filterChecked === null) {
        return getTodos();
      }

      return getFilteredTodos(filterChecked);
    },
    todo: (parent, { id }) => getTodo(id),

    users() {
      return users;
    },
    user(parent, { username }) {
      return users.find((user) => user.username === username);
    },
  },
  Mutation: {
    createTodo: (parent, { title, checked = false }) =>
      createTodo(title, checked),
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({ schema }).createHandler({
  path: "/api/graphql",
});
