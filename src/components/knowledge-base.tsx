import React, { useState } from 'react';
import './knowledge-base.css';
import { API_BASE_URL } from '../utils/api';

const KnowledgeBase: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));
      const response = await fetch(`${API_BASE_URL}/api/chat/documents/upload/`, { method: 'POST', body: formData });
      if (response.ok) {
        alert('Files uploaded successfully!');
        setFiles([]);
      } else {
        alert('Upload failed.');
      }
    } catch (error) {
      alert('Upload error.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="knowledge-base">
      <h1>Knowledge Base</h1>
      <p>Upload documents for the AI knowledge base.</p>

      <div className="upload-area">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt"
          id="file-input"
          style={{ display: 'none' }}
        />
        <label htmlFor="file-input" className="upload-label">
          <div className="upload-content">
            <span>Click to select files or drag and drop</span>
            <small>Supported formats: PDF, DOC, DOCX, TXT</small>
          </div>
        </label>
      </div>

      {files.length > 0 && (
        <div className="file-list">
          <h3>Selected Files:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</li>
            ))}
          </ul>
          <button onClick={handleUpload} disabled={uploading} className="upload-btn">
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;