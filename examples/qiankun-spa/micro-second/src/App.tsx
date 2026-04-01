import { Link, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>spaMicroSecond</h1>
      <p style={{ color: '#64748b' }}>Webpack5 子应用 · 独立端口 9102</p>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Link to="x">子路由 X</Link>
        <Link to="y">子路由 Y</Link>
      </nav>
      <Routes>
        <Route index element={<p>默认（basename 与主应用 /micro/second 对齐）</p>} />
        <Route path="x" element={<p>页面 X</p>} />
        <Route path="y" element={<p>页面 Y</p>} />
      </Routes>
    </div>
  );
}
