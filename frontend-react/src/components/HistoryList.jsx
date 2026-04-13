import { useEffect, useState } from 'react';
import { getDiagnosisHistory } from '../services/api';

export default function HistoryList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await getDiagnosisHistory();
        setItems(response.data.data || []);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  if (loading) return <p>Memuat riwayat...</p>;
  if (!items.length) return <p>Belum ada riwayat diagnosa.</p>;

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '16px',
          }}
        >
          <img
            src={item.image_url}
            alt={item.disease}
            style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <h3>{item.disease}</h3>
          <p>Confidence: {item.confidence}%</p>
          <p>Status: {item.is_healthy ? 'Sehat' : 'Terindikasi sakit'}</p>
          <p>Saran: {item.treatment}</p>
        </div>
      ))}
    </div>
  );
}