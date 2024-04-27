import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { forwardRef } from 'react';

type ArrowButtonProps = {
	onClick: () => void,
	isActive: boolean,
}

export const ArrowButton = forwardRef<HTMLButtonElement | null, ArrowButtonProps>((props, ref) => {
	const { onClick, isActive } = props;

	return (
		<button
			ref={ref}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${isActive ? styles.container_open : ''}`}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={`${styles.arrow} ${isActive ? styles.arrow_open : ''}`} />
		</button>
	);
});