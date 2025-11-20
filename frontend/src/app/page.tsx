import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center w-full">ToDo App</h1>
        <TodoForm />
        <TodoList />
      </main>
    </div>
  );
}
