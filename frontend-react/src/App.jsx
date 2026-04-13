import { NavLink, Route, Routes } from 'react-router-dom'
import UploadPage from './pages/UploadPage'
import HistoryPage from './pages/HistoryPage'

export default function App() {
  const navClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm transition ${
      isActive
        ? 'bg-[#1F2937] text-white'
        : 'text-slate-600 hover:bg-white hover:text-slate-900'
    }`

  return (
    <div className="min-h-screen bg-[#F6F7F3]">
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        <header className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              TaniScan
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
              Deteksi penyakit tanaman dari foto dengan alur yang sederhana dan hasil yang mudah dibaca.
            </p>
          </div>

          <nav className="inline-flex w-fit gap-2 rounded-full border border-[#E7E9E3] bg-[#F1F3EE] p-1">
            <NavLink to="/" end className={navClass}>
              Upload
            </NavLink>
            <NavLink to="/history" className={navClass}>
              History
            </NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </div>
  )
}