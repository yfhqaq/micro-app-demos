import './public-path';
import { createRoot, type Root } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

let root: Root | null = null;

function getRootNode(container?: HTMLElement) {
  const el = container?.querySelector('#root') ?? document.querySelector('#root');
  if (!el) throw new Error('spaMicroFirst: #root not found');
  return el as HTMLElement;
}

function render(props: { container?: HTMLElement }) {
  const node = getRootNode(props.container);
  root = createRoot(node);
  root.render(
    <BrowserRouter
      basename={
        (window as Window & { __POWERED_BY_QIANKUN__?: boolean }).__POWERED_BY_QIANKUN__
          ? '/micro/first'
          : '/'
      }
    >
      <App />
    </BrowserRouter>,
  );
}

if (!(window as Window & { __POWERED_BY_QIANKUN__?: boolean }).__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[spaMicroFirst] bootstrap');
}

export async function mount(props: { container?: HTMLElement }) {
  console.log('[spaMicroFirst] mount', props);
  render(props);
}

export async function unmount(props: { container?: HTMLElement }) {
  console.log('[spaMicroFirst] unmount', props);
  root?.unmount();
  root = null;
  const node = props.container?.querySelector('#root') ?? document.querySelector('#root');
  if (node) node.innerHTML = '';
}
