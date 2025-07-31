import React, { useState, useRef, useEffect } from 'react';
import { API_HOST } from './consts';
const STUDENTS = [
  { label: 'Emi 10th Grade', value: 'emi' },
  { label: 'Indie 10th Grade', value: 'indie' },
  { label: 'Ella 10th Grade', value: 'ella' },
];

function StudentChatsPage() {
  const [chats, setChats] = useState({
    spencer: [],
    indie: [],
    ella: [],
  });
  const [input, setInput] = useState('');
  const [student, setStudent] = useState(STUDENTS[0].value);
  const chatEndRef = useRef(null);

  const messages = chats[student] || [];

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { text: input, sender: 'user' };
    setChats(prev => ({
      ...prev,
      [student]: [...(prev[student] || []), userMsg],
    }));
    
    const currentInput = input;
    setInput('');
    
    try {
      const response = await fetch(`${API_HOST}/api/student-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          student: student
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setChats(prev => ({
          ...prev,
          [student]: [...(prev[student] || []), { text: data.response, sender: 'bot' }],
        }));
      } else {
        // Handle error case
        setChats(prev => ({
          ...prev,
          [student]: [...(prev[student] || []), { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' }],
        }));
      }
    } catch (error) {
      console.error('Error calling backend:', error);
      setChats(prev => ({
        ...prev,
        [student]: [...(prev[student] || []), { text: 'Sorry, I\'m having trouble connecting to the server. Please try again.', sender: 'bot' }],
      }));
    }
  }

  function handleStudentChange(e) {
    setStudent(e.target.value);
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontWeight: 600, fontSize: 20 }}>Chatting with...</span>
        <select
          value={student}
          onChange={handleStudentChange}
          style={{ fontSize: 16, padding: '6px 16px', borderRadius: 8, border: '1px solid #ccc' }}
        >
          {STUDENTS.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', height: '70vh', border: '1px solid #eee', borderRadius: 16, background: '#fafbfc', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'user' ? '#8b3a2b' : '#e0e0e0',
                color: msg.sender === 'user' ? '#fff' : '#444',
                borderRadius: 18,
                padding: '10px 18px',
                maxWidth: '70%',
                fontSize: 16,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSend} style={{ display: 'flex', padding: 16, borderTop: '1px solid #eee', background: '#fff', borderRadius: '0 0 16px 16px' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{ flex: 1, fontSize: 16, padding: 12, borderRadius: 8, border: '1px solid #ccc', marginRight: 12 }}
          />
          <button type="submit" style={{ padding: '0 24px', borderRadius: 8, background: '#8b3a2b', color: '#fff', border: 'none', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentChatsPage; 