import UploadCard from '../components/UploadCard'

export default function UploadPage() {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Deteksi penyakit tanaman dari foto daun
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-500 md:text-lg">
          Upload gambar daun, lalu sistem akan menampilkan hasil prediksi, tingkat keyakinan, dan saran penanganan awal.
        </p>
      </div>

      <UploadCard />
    </section>
  )
}