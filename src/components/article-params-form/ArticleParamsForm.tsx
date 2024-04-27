import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { OnSubmitChange, backgroundColors, contentWidthArr, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { Separator } from '../separator';
import { useRef, useState } from 'react';
import { Text } from '../text';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

export const ArticleParamsForm = ({ onSubmitChange }: { onSubmitChange: OnSubmitChange }) => {
	const [selectedOptions, setSelectedOptions] = useState({
		fontFamily: fontFamilyOptions[0],
		fontSize: fontSizeOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
	});

	const [isFormActive, setIsFormActive] = useState(false);

	const formRef = useRef<HTMLDivElement | null>(null);

	const handleArrowClick = () => {
		setIsFormActive(prevState => !prevState);
	}

	const handleSubmitChange = () => {
		onSubmitChange(
			{
				'--font-family': selectedOptions.fontFamily.value,
				'--font-size': selectedOptions.fontSize.value,
				'--font-color': selectedOptions.fontColor.value,
				'--container-width': selectedOptions.contentWidth.value,
				'--bg-color': selectedOptions.backgroundColor.value
			}
		);
	}

	const resetParams = () => {
		setSelectedOptions({
			fontFamily: fontFamilyOptions[0],
			fontSize: fontSizeOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0]
		});
		handleSubmitChange();
	}

	const submitParams = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleSubmitChange();
	}

	useOutsideClickClose({
		isOpen: isFormActive,
		rootRef: formRef,
		onChange: setIsFormActive
	});

	return (
		<>
			<div ref={formRef}>
				<ArrowButton
					onClick={handleArrowClick} isActive={isFormActive} />
				<aside
					className={`${styles.container} ${isFormActive ? styles.container_open : ''}`}>
					<form className={styles.form} onSubmit={submitParams} onReset={resetParams}>
						<Text as='h1' size={31} weight={800} family={'open-sans'} uppercase>
							Задайте параметры
						</Text>
						<Select
							selected={selectedOptions.fontFamily}
							options={fontFamilyOptions}
							onChange={(selected) => {
								setSelectedOptions((prevOptions) => ({
									...prevOptions,
									fontFamily: selected,
								}));
							}}
							title='Шрифт'
						/>
						<RadioGroup
							name='Размер шрифта'
							selected={selectedOptions.fontSize}
							options={fontSizeOptions}
							onChange={(selected) => {
								setSelectedOptions((prevOptions) => ({
									...prevOptions,
									fontSize: selected,
								}));
							}}
							title='Размер шрифта'
						/>
						<Select
							selected={selectedOptions.fontColor}
							options={fontColors}
							onChange={(selected) => {
								setSelectedOptions((prevOptions) => ({
									...prevOptions,
									fontColor: selected,
								}));
							}}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={selectedOptions.backgroundColor}
							options={backgroundColors}
							onChange={(selected) => {
								setSelectedOptions((prevOptions) => ({
									...prevOptions,
									backgroundColor: selected,
								}));
							}}
							title='Цвет фона'
						/>
						<Select
							selected={selectedOptions.contentWidth}
							options={contentWidthArr}
							onChange={(selected) => {
								setSelectedOptions((prevOptions) => ({
									...prevOptions,
									contentWidth: selected,
								}));
							}}
							title='Ширина контента'
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={resetParams} />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
