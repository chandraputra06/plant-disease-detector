import { useState } from 'react';
import { diagnoseImage } from '../services/api';

export default function UploadCard() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const data = await diagnoseImage(file);
      setResult(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <br /><br />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '12px' }}
          />
        )}

        <br />
        <button type="submit" disabled={!file || loading}>
          {loading ? 'Mendiagnosa...' : 'Diagnosa Sekarang'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '20px', padding: '16px', border: '1px solid #ddd', borderRadius: '12px' }}>
          <h3>Hasil Diagnosa</h3>
          <p><strong>Penyakit:</strong> {result.result.disease}</p>
          <p><strong>Confidence:</strong> {result.result.confidence}%</p>
          <p><strong>Status:</strong> {result.result.is_healthy ? 'Sehat' : 'Terindikasi sakit'}</p>
          <p><strong>Saran:</strong> {result.result.treatment}</p>
        </div>
      )}
    </div>
  );
}