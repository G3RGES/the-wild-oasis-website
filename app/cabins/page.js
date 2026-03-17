import Counter from "../components/Counter";

export default async function Page() {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  console.log(data);

  return (
    <div>
      <h1>Cabins</h1>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul>

      <Counter users={data} />
    </div>
  );
}
