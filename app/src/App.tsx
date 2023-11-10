import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import { routes } from './routes';
import { CustomersPage } from './pages/customers/CustomersPage';
import { CustomerDetailsPage } from './pages/customerDetails/CustomerDetailsPage';
import { CreateCustomerPage } from './pages/createCustomer/CreateCustomerPage';
import { useOnMount } from './hooks';
import { PageHeader, SideMenu } from './components';
import './styles/global.scss';

// testing deploy-app workflow #2

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
    <BrowserRouter>
      <PageHeader />
      <SideMenu />
      <Routes>
        <Route path={routes.customers} Component={CustomersPage} />
        <Route path={routes.customerDetails} Component={CustomerDetailsPage} />
        <Route path={routes.addCustomer} Component={CreateCustomerPage} />
        <Route path="*" Component={CustomersPage} />
      </Routes>
    </BrowserRouter>
  );
}