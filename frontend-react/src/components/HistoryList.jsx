import { useEffect, useState } from 'react'
import { getDiagnosisHistory } from '../services/api'

export default function HistoryList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await getDiagnosisHistory()
        setItems(response.data.data || [])
      } catch (error) {
        alert(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  if (loading) {
    return (
      <div className="rounded-[28px] border border-[#E7E9E3] bg-white p-6 text-slate-500">
        Memuat riwayat...
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="rounded-[28px] border border-[#E7E9E3] bg-white p-6 text-slate-500">
        Belum ada riwayat diagnosa.
      </div>
    )
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="overflow-hidden rounded-[28px] border border-[#E7E9E3] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5"
        >
          <img
            src={item.image_url}
            alt={item.disease}
            className="h-56 w-full object-cover"
          />

          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                {item.disease}
              </h3>
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  item.is_healthy
                    ? 'bg-[#E8F5E8] text-[#4C7C47]'
                    : 'bg-[#F8EFD8] text-[#9A6B17]'
                }`}
              >
                {item.is_healthy ? 'Sehat' : 'Sakit'}
              </span>
            </div>

            <div className="mt-4 rounded-2xl bg-[#F8FAF6] p-4">
              <p className="text-sm text-slate-500">Confidence</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {item.confidence}%
              </p>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              {item.treatment}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}