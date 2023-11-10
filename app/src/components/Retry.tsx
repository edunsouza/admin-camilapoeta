import { Button, Typography } from 'antd';
import styles from './Retry.module.scss';

export interface RetryProps {
  label: string;
  retry?: () => void;
}

export const Retry = ({ label, retry }: RetryProps) => {
  return (
    <div className={styles.root}>
      <Typography.Text>
        {label}
      </Typography.Text>
      {
        typeof retry === 'function' &&
        <Button onClick={retry}>
          Repetir
        </Button>
      }
    </div>
  );
};