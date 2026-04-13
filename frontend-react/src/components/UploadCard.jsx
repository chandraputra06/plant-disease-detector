import { useState } from 'react'
import { diagnoseImage } from '../services/api'

export default function UploadCard() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const selectedFile = event.target.files[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
    setResult(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!file) return

    setLoading(true)
    try {
      const data = await diagnoseImage(file)
      setResult(data)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-[28px] border border-[#E7E9E3] bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] md:p-7"
      >
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-slate-900">Upload gambar</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Gunakan foto daun yang terlihat jelas agar hasil analisis lebih baik.
          </p>
        </div>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-[#C9D8C6] bg-[#FAFCF8] px-6 py-12 text-center transition hover:bg-[#F6FAF4]">
          <span className="text-base font-medium text-slate-800">
            Pilih gambar dari perangkat
          </span>
          <span className="mt-2 text-sm text-slate-500">
            Format JPG, JPEG, atau PNG. Maksimal 5MB.
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>

        {file && (
          <div className="mt-4 rounded-2xl bg-[#F8FAF6] px-4 py-3 text-sm text-slate-600">
            {file.name}
          </div>
        )}

        {preview && (
          <div className="mt-5 overflow-hidden rounded-[24px] border border-[#EEF1EA] bg-[#F8FAF6]">
            <img
              src={preview}
              alt="Preview"
              className="h-[340px] w-full object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!file || loading}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#78B96F] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#689F61] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Menganalisis...' : 'Mulai diagnosa'}
        </button>
      </form>

      <section className="rounded-[28px] border border-[#E7E9E3] bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] md:p-7">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-slate-900">Hasil analisis</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Ringkasan hasil prediksi akan tampil di panel ini.
          </p>
        </div>

        {!result && (
          <div className="rounded-[22px] bg-[#F8FAF6] p-6 text-sm leading-7 text-slate-500">
            Belum ada hasil. Setelah gambar dikirim, sistem akan menampilkan prediksi penyakit, confidence, dan saran penanganan.
          </div>
        )}

        {result && (
          <div className="space-y-5">
            <div className="rounded-[22px] bg-[#F8FAF6] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">Prediksi utama</p>
                  <h4 className="mt-1 text-2xl font-semibold leading-tight text-slate-900">
                    {result.result.disease}
                  </h4>
                </div>

                <div
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                    result.result.is_healthy
                      ? 'bg-[#E8F5E8] text-[#4C7C47]'
                      : 'bg-[#F8EFD8] text-[#9A6B17]'
                  }`}
                >
                  {result.result.is_healthy ? 'Sehat' : 'Perlu perhatian'}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-sm text-slate-500">Confidence</p>
                  <p className="mt-1 text-3xl font-semibold text-slate-900">
                    {result.result.confidence}%
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="mt-1 text-base font-medium text-slate-900">
                    {result.result.is_healthy ? 'Tanaman terlihat sehat' : 'Ada indikasi penyakit'}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white p-4">
                <p className="text-sm text-slate-500">Saran penanganan</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {result.result.treatment}
                </p>
              </div>
            </div>

            {result.result.top_3?.length > 0 && (
              <div>
                <h5 className="mb-3 text-sm font-medium text-slate-700">
                  Kemungkinan lain
                </h5>

                <div className="space-y-3">
                  {result.result.top_3.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-2xl border border-[#EEF1EA] bg-white px-4 py-3"
                    >
                      <div className="min-w-0 pr-4">
                        <p className="truncate text-sm font-medium text-slate-800">
                          {item.disease}
                        </p>
                      </div>
                      <p className="text-sm text-slate-500">{item.confidence}%</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}