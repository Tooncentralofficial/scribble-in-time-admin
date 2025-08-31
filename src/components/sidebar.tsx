import React from 'react';
import './sidebar.css';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, isOpen, onToggle }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2> A Scribble In Time Admin Dashboard</h2>
      </div>
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activeSection === 'knowledge-base' ? 'active' : ''}`}
          onClick={() => onSectionChange('knowledge-base')}
        >
          Knowledge Base
        </button>
        <button
          className={`nav-item ${activeSection === 'conversation' ? 'active' : ''}`}
          onClick={() => onSectionChange('conversation')}
        >
          Conversation
        </button>
        <button
          className={`nav-item ${activeSection === 'users' ? 'active' : ''}`}
          onClick={() => onSectionChange('users')}
        >
          Users
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;