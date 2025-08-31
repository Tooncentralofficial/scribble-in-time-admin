import React, { useState, useEffect } from 'react';
import './conversation.css';
import { API_BASE_URL } from '../utils/api';

import { Message, Conversation as ConversationType } from './index';

const Conversation: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/conversations/`);
        if (response.ok) {
          const data = await response.json();
          setConversations(data.results || []);
        } else {
          setConversations([]);
        }
      } catch (error) {
        setConversations([]);
      }
    };

    fetchConversations();
  }, []);

  const handleSelectConversation = async (conversation: ConversationType) => {
    setSelectedConversation(conversation);
    try {
      const response = await fetch(`${API_BASE_URL}/api/conversations/${conversation.id}/messages/`);
      if (response.ok) {
        const data = await response.json();
        setMessages(Array.isArray(data) ? data : []);
      } else {
        setMessages([]);
      }
    } catch (error) {
      setMessages([]);
    }
  };

  return (
    <div className="conversation">
      {!selectedConversation ? (
        // Conversation List View
        <>
          <h1>Conversation Monitoring</h1>
          <p>Monitor messages between AI and clients.</p>

          <div className="conversation-list-full">
            <h3>Recent Conversations</h3>
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="conversation-item"
                onClick={() => handleSelectConversation(conv)}
              >
                <div className="conversation-header">
                  <span className="user-id">Conversation: {conv.id}</span>
                  <span className="timestamp">{new Date(conv.created_at).toLocaleString()}</span>
                </div>
                <p className="last-message">{conv.last_message.content}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Chat View
        <>
          <div className="chat-header">
            <button
              className="back-button"
              onClick={() => setSelectedConversation(null)}
            >
              ← Back to Conversations
            </button>
            <h2>Chat with Conversation {selectedConversation.id}</h2>
          </div>

          <div className="messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-content">
                  <strong>{msg.sender === 'user' ? 'User' : 'AI'}:</strong> {msg.content}
                </div>
                <small className="message-time">{new Date(msg.created_at).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Conversation;