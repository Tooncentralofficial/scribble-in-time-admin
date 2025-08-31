export interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  created_at: string;
}

export interface Conversation {
  id: number;
  user: any;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  ai_enabled: boolean;
  last_message: {
    content: string;
    sender: 'ai' | 'user';
    created_at: string;
  };
  unread_count: number;
}

export { default as Sidebar } from './sidebar';
export { default as KnowledgeBase } from './knowledge-base';
export { default as ConversationComponent } from './conversation';
export { default as Users } from './users';