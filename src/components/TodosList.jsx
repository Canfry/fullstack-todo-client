export default function TodosList({ todo }) {
  return (
    <div>
      <li>{todo.description}</li>
      <p>{todo.status}</p>
    </div>
  );
}
