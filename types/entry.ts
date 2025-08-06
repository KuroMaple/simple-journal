export type JournalEntry = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  user_id?: string;
};

export type JournalEntries = JournalEntry[];
