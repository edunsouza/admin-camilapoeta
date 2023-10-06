import { useOnMount } from './hooks';
import { Router } from './routes';
import { PageHeader, SideMenu } from './components';
import './styles/global.scss';

export const App = () => {
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