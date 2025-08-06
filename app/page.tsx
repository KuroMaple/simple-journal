"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabaseClient'
import { JournalEntries } from '@/types/entry'
import User from '@/types/user'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState<User>({
    id: "11111111-1111-1111-1111-111111111111",
    name: 'Hassan'
  })



  const handleAddEntry = async () => {
    const { data, error } = await supabase.from('entries').insert({
      title,
      content,
      user_id: user.id
    })
    
    if (error) {
      console.error("Failed to add entry: ", error)
      return
    }
    
    
    setTitle("");
    setContent("");
  };

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
      <Input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text" 
        className="border border-gray-300 rounded-md p-2 w-full" 
        placeholder="Entry Title" />
      <Textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full mt-2" 
        placeholder="Entry Content" />
      <div className="flex justify-end w-full rounded-md">

      <Link href="/PastEntries">
        
        <Button className="px-4 py-2 mt-4" variant={'outline'}>
          View Past Entries
        </Button>
      </Link>

        <Button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2 hover:bg-blue-600 transition-transform duration-200 active:scale-95">Add Entry</Button>
      </div>
      </form>  
    </div>
  );
}
