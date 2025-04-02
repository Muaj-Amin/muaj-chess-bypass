import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [link, setLink] = useState('');
  const [review, setReview] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setReview(null);
    setError('');

    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/game-review', {
        gameLink: link
      });

      setReview(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '80px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Chess.com Game Review</h2>
      <input
        type="text"
        placeholder="Paste Chess.com game link here"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', marginBottom: '10px' }}
      />
      <button
        onClick={handleSubmit}
        style={{ width: '100%', padding: '10px', borderRadius: '4px', background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Submit
      </button>

      {error && <p style={{ color: '#f44336', marginTop: '15px' }}>{error}</p>}

      {review && (
        <pre style={{ marginTop: '15px', padding: '10px', background: '#333', borderRadius: '4px', color: '#cfcfcf' }}>
{JSON.stringify(review, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default App;