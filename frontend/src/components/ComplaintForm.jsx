import { useState } from 'react';
import { createComplaint } from '../services/api';

const categories = ['Network', 'Hostel', 'Electrical', 'Water', 'Other'];

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  fontSize: '14px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  backgroundColor: '#fff',
  color: '#111827',
  outline: 'none',
  transition: 'border-color 0.15s',
  fontFamily: 'inherit',
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: '500',
  color: '#374151',
  marginBottom: '6px',
};

const ComplaintForm = ({ onComplaintAdded }) => {
  const [formData, setFormData] = useState({ title: '', description: '', category: 'Network' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;
    setIsSubmitting(true);
    try {
      await createComplaint(formData);
      setFormData({ title: '', description: '', category: 'Network' });
      setMessage({ text: 'Ticket created.', type: 'success' });
      onComplaintAdded();
      setTimeout(() => setMessage({ text: '', type: '' }), 4000);
    } catch {
      setMessage({ text: 'Could not reach the server. Is the backend running?', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6" style={{ paddingTop: '28px' }}>
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '24px',
      }}>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>New ticket</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label style={labelStyle}>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief description of the issue"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#111827'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#111827'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="What's happening? Where? When did it start?"
              style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.5' }}
              onFocus={e => e.target.style.borderColor = '#111827'}
              onBlur={e => e.target.style.borderColor = '#d1d5db'}
              required
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '500',
                backgroundColor: isSubmitting ? '#6b7280' : '#111827',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.15s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => { if (!isSubmitting) e.target.style.backgroundColor = '#374151'; }}
              onMouseLeave={e => { if (!isSubmitting) e.target.style.backgroundColor = '#111827'; }}
            >
              {isSubmitting ? 'Creating…' : 'Create ticket'}
            </button>

            {message.text && (
              <span style={{
                fontSize: '13px',
                color: message.type === 'success' ? '#059669' : '#dc2626',
              }}>
                {message.text}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;