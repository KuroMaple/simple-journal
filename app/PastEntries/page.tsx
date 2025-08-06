"use client";
import { supabase } from '@/lib/supabaseClient'
import { JournalEntries } from '@/types/entry'
import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function PastEntries() {

  const [entries, setEntries] = useState<JournalEntries>();
  
  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching entries:", error);
      return;
    }

    if (data) {
      setEntries(data);
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])
  
  // Render the past entries
  return (
    <div className="align-center flex w-full max-w-md flex-col items-center justify-center px-4">
      <div className="flex justify-end w-full rounded-md gap-2">
        <Link href="/">
          <button className="bg-gray-200 hover:bg-gray-300 text-black rounded-md px-4 py-2 mt-4">
            Back to Home
          </button>
        </Link>
        <h1 className="text-3xl font-bold underline pb-8">Past Journal Entries</h1>
      </div>
      
      {entries && entries.length > 0 ? (
        <ul className="w-full">
          {entries.map((entry) => (
              <li key={entry.id} className="border-b border-gray-300 py-2">
                <Link href={`/PastEntries/${entry.id}`}>
                  <h2 className="font-bold">{entry.title}</h2>
                  <p>{entry.content}</p>
                </Link>
              </li>
            ))}
        </ul>
      ) : (
        <p>No past entries found.</p>
          )}
    </div>
  );
}
