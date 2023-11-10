import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Input } from 'antd';
import { parseRoute } from '../../routes';
import { setAppTitle } from '../../store/settings';
import { useCustomers, setNewCustomerError, changeNewCustomer, createCustomer } from '../../store/customers';
import { useOnMount } from '../../hooks';
import { LoaderOverlay, PageBody } from '../../components';
import { validateCustomer } from '../../utils/validations';
import styles from './CreateCustomerPage.module.scss';

export const CreateCustomerPage = () => {
  const navigate = useNavigate();
  const [newCustomer, loading, error] = useCustomers(s => [
    s.newCustomer,
    s.newCustomerLoading,
    s.newCustomerError
  ]);

  const create = () => {
    const validationError = validateCustomer(newCustomer);
    if (validationError) {
      return setNewCustomerError(validationError);
    }

    createCustomer({
      name: newCustomer.name?.trim() || '',
      email: newCustomer.email?.trim() || '',
      phone: newCustomer.phone?.trim() || ''
    });
  };

  useOnMount(() => {
    setAppTitle('Novo Cliente');
  });

  useEffect(() => {
    if (newCustomer?.id?.toString().trim()) {
      navigate(parseRoute('customerDetails', newCustomer.id));
    }
  }, [newCustomer?.id, navigate]);

  return (
    <PageBody>
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        {loading && <LoaderOverlay />}
        {error && <Alert message={error} type="error" />}

        <Input
          addonBefore="Nome"
          value={newCustomer?.name || ''}
          onChange={({ target }) => changeNewCustomer({ name: target.value })}
          placeholder="Cliente"
        />
        <Input
          addonBefore="Email"
          value={newCustomer?.email || ''}
          onChange={({ target }) => changeNewCustomer({ email: target.value })}
          placeholder="exemplo@gmail.com"
        />
        <Input
          addonBefore="Fone"
          value={newCustomer?.phone || ''}
          onChange={({ target }) => changeNewCustomer({ phone: target.value })}
          placeholder="00 1234 5678"
        />

        <Button
          onClick={create}
          size="large"
          type="primary"
          shape="round"
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Registrar cliente'}
        </Button>
      </form>
    </PageBody>
  );
};
