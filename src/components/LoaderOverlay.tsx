import { SpinnerIcon } from '../icons';
import styles from './LoaderOverlay.module.scss';

export const LoaderOverlay = () => {
  return (
    <div className={styles.root}>
      <SpinnerIcon width='40px' height='40px' />
    </div>
  );
};