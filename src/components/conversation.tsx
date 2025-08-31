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
      <h1>Conversation Monitoring</h1>
      <p>Monitor messages between AI and clients.</p>

      <div className="conversation-container">
        <div className="conversation-list">
          <h3>Recent Conversations</h3>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''}`}
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

        <div className="chat-view">
          {selectedConversation ? (
            <>
              <h3>Chat with Conversation {selectedConversation.id}</h3>
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
          ) : (
            <p>Select a conversation to view messages.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversation;