'use client'

import { useEffect, useState } from 'react'
import { JournalEntry } from '@/types/entry'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'


export default  function EntryPage() {
  const params = useParams();
  const entryId = params.entryId;
  const [entry, setEntry] = useState<JournalEntry | null>(null)

  const fetchEntry = async () => {
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("id", entryId)
      .single()

    if (error) {
      console.error("Error fetching entry:", error)
      return
    }

    setEntry(data)
  }

  useEffect(() => {
    if (entryId) fetchEntry()
  }, [entryId])

  const title = entry?.title || "Entry Not Found";
  const content = entry?.content || "The requested journal entry does not exist.";
  return (
    <div className="align-center flex w-full max-w-md flex-col items-center justify-center px-4">
      <Link href="/PastEntries">
        <button className="bg-gray-200 hover:bg-gray-300 text-black rounded-md px-4 py-2 mt-4 self-start">
          Back to Past Entries
        </button>
      </Link>
      <h1 className="text-3xl font-bold underline pb-8">{title}</h1>
      <p>{content}</p>
    </div>
  )
}