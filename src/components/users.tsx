import React, { useState, useEffect } from 'react';
import './users.css';
import { API_BASE_URL } from '../utils/api';

interface Submission {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  theme: string;
  subject: string;
  main_themes: string;
  key_life_events: string;
  audience: string;
  submitted_at: string;
  is_processed: boolean;
}

interface Pagination {
  current_page: number;
  total_pages: number;
  total_count: number;
  has_next: boolean;
  has_previous: boolean;
  page_size: number;
}

interface Filters {
  search: string;
  audience: string;
  is_processed: string;
  date_from: string;
  date_to: string;
}

const Users: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    audience: '',
    is_processed: '',
    date_from: '',
    date_to: '',
  });

  const fetchSubmissions = async (page = 1) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        page_size: '20',
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== '')
        ),
      });

      const response = await fetch(`${API_BASE_URL}/api/memoir/submissions/?${queryParams}`);
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.data || []);
        setPagination(data.pagination || null);
      } else {
        setSubmissions([]);
        setPagination(null);
      }
    } catch (error) {
      setSubmissions([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [filters]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handlePageChange = (page: number) => {
    fetchSubmissions(page);
  };

  return (
    <div className="users">
      <h1>Memoir Form Submissions</h1>
      <p>Track and manage memoir form submissions from users.</p>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name, email, or theme"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
        <select
          value={filters.audience}
          onChange={(e) => handleFilterChange('audience', e.target.value)}
        >
          <option value="">All Audiences</option>
          <option value="family_friends">Family and Friends</option>
          <option value="public">Public</option>
          <option value="specific_group">Specific Group</option>
        </select>
        <select
          value={filters.is_processed}
          onChange={(e) => handleFilterChange('is_processed', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="true">Processed</option>
          <option value="false">Not Processed</option>
        </select>
        <input
          type="date"
          value={filters.date_from}
          onChange={(e) => handleFilterChange('date_from', e.target.value)}
        />
        <input
          type="date"
          value={filters.date_to}
          onChange={(e) => handleFilterChange('date_to', e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="submissions-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Theme</th>
                  <th>Subject</th>
                  <th>Audience</th>
                  <th>Submitted At</th>
                  <th>Processed</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub.id}>
                    <td>{sub.id}</td>
                    <td>{sub.first_name} {sub.last_name}</td>
                    <td>{sub.email}</td>
                    <td>{sub.phone_number}</td>
                    <td>{sub.theme}</td>
                    <td>{sub.subject}</td>
                    <td>{sub.audience}</td>
                    <td>{new Date(sub.submitted_at).toLocaleDateString()}</td>
                    <td>{sub.is_processed ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination && (
            <div className="pagination">
              <button
                disabled={!pagination.has_previous}
                onClick={() => handlePageChange(pagination.current_page - 1)}
              >
                Previous
              </button>
              <span>
                Page {pagination.current_page} of {pagination.total_pages}
              </span>
              <button
                disabled={!pagination.has_next}
                onClick={() => handlePageChange(pagination.current_page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Users;