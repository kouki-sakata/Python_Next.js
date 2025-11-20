import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center w-full">ToDo App</h1>
        <TodoForm />
        <TodoList />
      </main>
    </div>
  );
}
