import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, Input } from 'antd';
import { parseRoute } from '..';
import { setAppTitle } from '../../store/settings';
import { useCustomers, fetchCustomers, setPagination } from '../../store/customers';
import { useOnMount, useDebouncedValue } from '../../hooks';
import { List, PageBody, Retry } from '../../components';
import styles from './Customers.module.scss';

export const CustomersPage = () => {
  const [, setLocation] = useLocation();
  const { customers, total, loading, error, pagination } = useCustomers();
  const debouncedSearch = useDebouncedValue(pagination.search);

  useOnMount(() => {
    setAppTitle('Clientes');
  });

  useEffect(() => {
    if (debouncedSearch === pagination.search) {
      fetchCustomers(pagination);
    }
  }, [debouncedSearch, pagination]);

  const viewCustomerDetails = (id: string) => {
    setLocation(parseRoute('customerDetails', id));
  };

  const retryFetchCustomers = () => {
    fetchCustomers(pagination);
  };

  return (
    <PageBody>
      <section className={styles.search}>
        <Input
          addonBefore="Pesquisar"
          value={pagination.search}
          onChange={({ target }) => setPagination({ search: target.value })}
        />
      </section>

      {error && (
        <Retry label={error} retry={retryFetchCustomers} />
      )}

      <List
        data={customers}
        loading={loading}
        total={total || customers.length}
        pageSize={pagination.size}
        currentPage={pagination.page}
        onChange={(page, size) => setPagination({
          page: String(page),
          size: String(size)
        })}
        renderItem={(customer) => (
          <Card
            hoverable
            size="small"
            title={customer.name}
            onClick={() => viewCustomerDetails(customer.id!)}
          >
            <div className={styles.cardContent}>
              <label>
                Fone: <span>{customer.phone}</span>
              </label>
              <label>
                Email: <span>{customer.email}</span>
              </label>
            </div>
          </Card>
        )}
      />
    </PageBody>
  );
};
