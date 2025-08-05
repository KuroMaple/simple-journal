"use client";

import { JournalEntries } from '@/types/entry'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [entries, setEntries] = useState<JournalEntries>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hasHydrated, setHasHydrated] = useState(false);



  const handleAddEntry = () => {
    setEntries([...entries, { id: Date.now().toString(), createdAt: new Date(), updatedAt: new Date(), title, content }]);
    // Optionally, you can also log the entries to the console
    console.log("Current Entries:", [...entries, { title, content }]);
    // Reset form fields
    setTitle("");
    setContent("");
  };

  // Fetch entries from localStorage on initial render
  useEffect(() => {
    const storedEntries = localStorage.getItem("journalEntries");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
      console.log("Loaded Entries:", JSON.parse(storedEntries));
    }
    setHasHydrated(true);
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (hasHydrated) {
      localStorage.setItem("journalEntries", JSON.stringify(entries));
    }
  }, [entries, hasHydrated]);

  // Render the form 
  return (
    <div className="align-center flex w-full max-w-md flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold underline pb-8">Simple Journal App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddEntry();
        }}
        className="flex w-full flex-col gap-2"
      >
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text" 
        className="border border-gray-300 rounded-md p-2 w-full" 
        placeholder="Entry Title" />
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full mt-2" 
        placeholder="Entry Content" 
        rows={10} />
      <div className="flex justify-end w-full rounded-md">

      <Link href="/PastEntries">
        <button className="bg-gray-200 hover:bg-gray-300 text-black rounded-md px-4 py-2 mt-4">
          View Past Entries
        </button>
      </Link>

        <button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2 hover:bg-blue-600 transition-transform duration-200 active:scale-95">Add Entry</button>
      </div>
      </form>  
    </div>
  );
}
