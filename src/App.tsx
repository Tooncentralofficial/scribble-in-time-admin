import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import KnowledgeBase from './components/knowledge-base';
import Conversation from './components/conversation';
import Users from './components/users';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('knowledge-base');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="App">
      <button
        className={`hamburger-menu ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div
        className={`sidebar-overlay ${sidebarOpen ? '' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className="main-content">
        {renderMainContent()}
      </main>
    </div>
  );
}

export default App;
