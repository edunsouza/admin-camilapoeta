import { useOnMount } from './hooks/useOnMount';
import { Router } from './routes';
import { PageHeader, SideMenu } from './components/Page';
import './styles/overrides.scss';
import './App.scss';

function App() {
  useOnMount(() => {
    const focusOutHandler = () => setTimeout(() => window.scrollTo({
      // iOS safari "scroll on focus" workaround
      top: window.scrollY + 1,
      behavior: 'smooth'
    }), 100);

    document.addEventListener('focusout', focusOutHandler);

    return () => document.removeEventListener('focusout', focusOutHandler);
  });

  return (
    <>
      <PageHeader />
      <SideMenu />
      <Router />
    </>
  );
}

export default App;
