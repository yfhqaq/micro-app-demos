import { Link, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>spaMicroFirst</h1>
      <p style={{ color: '#64748b' }}>Webpack5 子应用 · 独立端口 9101</p>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Link to="a">子路由 A</Link>
        <Link to="b">子路由 B</Link>
      </nav>
      <Routes>
        <Route index element={<p>默认（basename 与主应用 /micro/first 对齐）</p>} />
        <Route path="a" element={<p>页面 A</p>} />
        <Route path="b" element={<p>页面 B</p>} />
      </Routes>
    </div>
  );
}
