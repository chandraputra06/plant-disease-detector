import { useState } from 'react';
import UploadPage from './pages/UploadPage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  const [page, setPage] = useState('upload');

  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <nav style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
        <button onClick={() => setPage('upload')}>Upload</button>
        <button onClick={() => setPage('history')}>History</button>
      </nav>

      {page === 'upload' ? <UploadPage /> : <HistoryPage />}
    </div>
  );
}