import { registerMicroApps, start } from 'qiankun';

const firstEntry =
  import.meta.env.VITE_FIRST_ENTRY ?? '//localhost:9101';
const secondEntry =
  import.meta.env.VITE_SECOND_ENTRY ?? '//localhost:9102';

function isFirstPath(pathname: string) {
  return (
    pathname === '/micro/first' ||
    pathname.startsWith('/micro/first/')
  );
}

function isSecondPath(pathname: string) {
  return (
    pathname === '/micro/second' ||
    pathname.startsWith('/micro/second/')
  );
}

/** 纯浏览器环境，可直接静态 import qiankun（无 SSR） */
export function initQiankun(container: HTMLElement) {
  registerMicroApps([
    {
      name: 'spaMicroFirst',
      entry: firstEntry,
      container,
      activeRule: (location) => isFirstPath(location.pathname),
    },
    {
      name: 'spaMicroSecond',
      entry: secondEntry,
      container,
      activeRule: (location) => isSecondPath(location.pathname),
    },
  ]);
  start();
}
