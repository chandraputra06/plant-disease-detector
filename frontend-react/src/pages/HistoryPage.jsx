import HistoryList from '../components/HistoryList'

export default function HistoryPage() {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Riwayat diagnosa
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-500 md:text-lg">
          Semua hasil diagnosa yang sudah pernah disimpan akan ditampilkan di sini.
        </p>
      </div>

      <HistoryList />
    </section>
  )
}