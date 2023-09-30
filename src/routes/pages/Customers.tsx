import { useLocation } from 'wouter';
import { PageBody } from '../../components/Page';
import styles from './Customers.module.scss';

export const CustomersPage = () => {
  const [, setLocation] = useLocation();
  
  return (
    <PageBody className={styles.root}>
      <h1>- Customers -</h1>
      <button onClick={() => setLocation('/medidas/1')}>Medidas</button>
    </PageBody>
  );
};
