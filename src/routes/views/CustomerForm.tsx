import { Button, Input } from 'antd';
import { useCustomers, updateDraftCustomer } from '../../store/customers';
import styles from './CustomerForm.module.scss';

export const CustomerForm = () => {
  const customer = useCustomers(({ draftCustomer }) => draftCustomer);

  const saveCustomer = () => {
    // todo
  };

  return (
    <form className={styles.form} onSubmit={e => e.preventDefault()}>
      <Input
        addonBefore="Nome"
        value={customer?.name || ''}
        onChange={({ target }) => updateDraftCustomer({ name: target.value })}
        placeholder="Cliente"
      />
      <Input
        addonBefore="Email"
        value={customer?.email || ''}
        onChange={({ target }) => updateDraftCustomer({ email: target.value })}
        placeholder="exemplo@gmail.com"
      />
      <Input
        addonBefore="Telefone"
        value={customer?.phone || ''}
        onChange={({ target }) => updateDraftCustomer({ phone: target.value })}
        placeholder="00 1234 5678"
      />

      <Button onClick={saveCustomer} size="large" type="primary" shape="round">
        Salvar cliente
      </Button>
    </form>
  );
};
