import React from 'react';
import './sidebar.css';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Dashboard</h2>
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