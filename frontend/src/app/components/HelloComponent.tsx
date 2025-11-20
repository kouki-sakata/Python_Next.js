"use client";

import { useQuery } from "@tanstack/react-query";

const fetchHello = async () => {
  const res = await fetch("http://localhost:8000/");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export default function HelloComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hello"],
    queryFn: fetchHello,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-2">Backend Connection Test</h2>
      <p className="text-green-600">{data.message}</p>
    </div>
  );
}
