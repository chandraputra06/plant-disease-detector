const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export async function diagnoseImage(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${BASE_URL}/diagnose`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Gagal melakukan diagnosa');
  }

  return response.json();
}

export async function getDiagnosisHistory() {
  const response = await fetch(`${BASE_URL}/diagnoses`);

  if (!response.ok) {
    throw new Error('Gagal mengambil riwayat diagnosa');
  }

  return response.json();
}