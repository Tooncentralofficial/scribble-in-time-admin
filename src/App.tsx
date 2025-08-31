import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import KnowledgeBase from './components/knowledge-base';
import Conversation from './components/conversation';
import Users from './components/users';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('knowledge-base');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'knowledge-base':
        return <KnowledgeBase />;
      case 'conversation':
        return <Conversation />;
      case 'users':
        return <Users />;
      default:
        return <KnowledgeBase />;
    }
  };

  return (
    <div className="App">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="main-content">
        {renderMainContent()}
      </main>
    </div>
  );
}

export default App;
