import { Button, Input } from 'antd';
import { useCustomers, updateCustomerSizing } from '../../store/customers';
import styles from './SizingForm.module.scss';

type Field = {
  name: string;
  value?: string | null;
  setter: (value: string) => void;
}

export const SizingForm = () => {
  const customer = useCustomers(({ draftCustomer }) => draftCustomer);
  const sizing = customer?.sizing || {};

  const saveSizing = () => {
    // todo
  };

  const toSetter = (field: string) => ((value: string) => updateCustomerSizing({ [field]: value }));
  const fields: Field[] = [
    { name: 'Braço', value: sizing.arm, setter: toSetter('arm') },
    { name: 'Costas', value: sizing.back, setter: toSetter('back') },
    { name: 'Busto', value: sizing.bust, setter: toSetter('bust') },
    { name: 'Cintura', value: sizing.waist, setter: toSetter('waist') },
    { name: 'Quadril', value: sizing.hip, setter: toSetter('hip') },
    { name: 'Decote', value: sizing.cleavage, setter: toSetter('cleavage') },
    { name: 'Manga', value: sizing.sleeve, setter: toSetter('sleeve') },
    { name: 'Gancho', value: sizing.crotch, setter: toSetter('crotch') },
    { name: 'Altura busto', value: sizing.bustHeight, setter: toSetter('bustHeight') },
    { name: 'Comprimento corpo', value: sizing.bodyLength, setter: toSetter('bodyLength') },
    { name: 'Comprimento saia', value: sizing.skirtLength, setter: toSetter('skirtLength') },
    { name: 'Comprimento calça', value: sizing.pantsLength, setter: toSetter('pantsLength') },
  ];

  return (
    <form className={styles.form} onSubmit={e => e.preventDefault()}>
      {
        fields.map(({ name, value, setter }) => (
          <Input
            key={name}
            addonBefore={name}
            value={value || ''}
            onChange={({ target }) => setter(target.value)}
            placeholder="0cm"
          />
        ))
      }

      <Button onClick={saveSizing} size="large" type="primary" shape="round">
        Salvar medida
      </Button>
    </form>
  );
};
