import queryGraphql from "../shared/query-graphql";

export default function TodoList({ todos }) {
  return (
    <div>
      <h1>Your todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label for={`todo-${todo.id}`}>
              <input type="checkbox" checked={todo.checked} />
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { todos } = await queryGraphql(`
    query {
      todos {
        id
        title
        checked
      }
    }
  `);
  return { props: { todos } };
}
