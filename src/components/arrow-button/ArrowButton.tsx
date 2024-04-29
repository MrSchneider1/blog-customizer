import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

type ArrowButtonProps = {
	onClick: () => void;
	isActive: boolean;
};

export const ArrowButton = ({ onClick, isActive }: ArrowButtonProps) => {
	return (
		<button
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isActive ? styles.container_open : '')}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isActive ? styles.arrow_open : '')}
			/>
		</button>
	);
};
