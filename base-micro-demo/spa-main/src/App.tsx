import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { initQiankun } from './qiankun';
import './App.css';

export default function App() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const inited = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || inited.current) return;
    inited.current = true;
    initQiankun(el);
  }, []);

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-title">Qiankun SPA 主应用</div>
        <p className="sidebar-hint">纯客户端渲染，无 Next / SSR</p>
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          首页
        </NavLink>
        <NavLink
          to="/micro/first"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          spaMicroFirst
        </NavLink>
        <NavLink
          to="/micro/second"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          spaMicroSecond
        </NavLink>
      </aside>
      <div className="content">
        <header className="content-header">
          当前路由：<code>{location.pathname}</code>
        </header>
        <div id="subapp-container" ref={containerRef} />
        {location.pathname === '/' && (
          <section className="home">
            <h2>首页</h2>
            <p>左侧进入子应用路由后，qiankun 会在上方容器内挂载对应微应用。</p>
          </section>
        )}
      </div>
    </div>
  );
}
