export type JournalEntry = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
};

export type JournalEntries = JournalEntry[];
