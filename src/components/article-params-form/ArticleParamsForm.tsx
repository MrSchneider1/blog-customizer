import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { OptionType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { Separator } from '../separator';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Text } from '../text';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

export type StylesToChange = {
	'--font-family': string,
	'--font-size': string,
	'--font-color': string,
	'--container-width': string,
	'--bg-color': string
}

type OnSubmitChange = (newStyles: StylesToChange) => void;

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
	const fontFamilySelectRef = useRef<HTMLUListElement | null>(null);
	const fontColorSelectRef = useRef<HTMLUListElement | null>(null);
	const backgroundColorSelectRef = useRef<HTMLUListElement | null>(null);
	const contentWidthSelectRef = useRef<HTMLUListElement | null>(null);

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

	// useEffect(() => {
		// const handleClickOutside = (event: MouseEvent) => {
		// 	if (formRef.current && !formRef.current.contains(event.target as Node) && arrowRef.current && !arrowRef.current.contains(event.target as Node)
		// 	) {
		// 		setIsFormActive(false);
		// 	}
		// };
		// const handleClickOutside = (event: MouseEvent) => {
			// if (formRef.current && !formRef.current.contains(event.target as Node) && arrowRef.current && !arrowRef.current.contains(event.target as Node)
			// )
			// if (
			// 	// event.target instanceof Node &&
			// 	!formRef.current?.contains(event.target as Node) &&
			// 	document.contains(event.target as Node)
			// ) {
			// 	setIsFormActive(false);
			// }
		// };

		// if (formRef.current && !formRef.current.contains(event.target as Node)
		// && arrowRef.current && !arrowRef.current.contains(event.target as Node)
		// && contentWidthSelectRef.current && !contentWidthSelectRef.current.contains(event.target as Node)
		// && fontColorSelectRef.current && !fontColorSelectRef.current.contains(event.target as Node)
		// && fontFamilySelectRef.current && !fontFamilySelectRef.current.contains(event.target as Node)
		// && backgroundColorSelectRef.current && !backgroundColorSelectRef.current.contains(event.target as Node)
		// ) {
		// if (fontColorSelectRef.current, contentWidthSelectRef.current, fontFamilySelectRef.current, backgroundColorSelectRef.current)
		// setIsFormActive(false);
		// 	console.log('вы нажали вне формы');
		// }
		// console.log(fontColorSelectRef.current, contentWidthSelectRef.current, backgroundColorSelectRef.current,
		// 	'вы нажали вне стрелки', arrowRef.current && !arrowRef.current.contains(event.target as Node),
		// 	"вы нажали вне формы", formRef.current && !formRef.current.contains(event.target as Node),
		// 	"вы нажали вне меню 1", fontFamilySelectRef.current && fontFamilySelectRef.current.contains(event.target as Node),
		// 	"вы нажали вне меню 2", fontColorSelectRef.current && fontColorSelectRef.current.contains(event.target as Node),
		// 	"вы нажали вне меню 3", backgroundColorSelectRef.current && backgroundColorSelectRef.current.contains(event.target as Node),
		// 	"вы нажали вне меню 4", contentWidthSelectRef.current && contentWidthSelectRef.current.contains(event.target as Node)
		// );
		// };

		// if (isFormActive) {
			// document.addEventListener('click', handleClickOutside);
		// } else {
			// document.removeEventListener('click', handleClickOutside);
		// }

		// return () => {
			// document.removeEventListener('click', handleClickOutside);
		// };
	// }, [isFormActive]);

	useOutsideClickClose ({ 
		isOpen: isFormActive, 
		rootRef: formRef, 
		onChange: setIsFormActive 
	});

	return (
		<>
		<div ref={formRef}> 
			<ArrowButton
				ref={arrowRef}
				onClick={handleArrowClick} isActive={isFormActive} />
			<aside
				className={`${styles.container} ${isFormActive ? styles.container_open : ''}`}>
				<form className={styles.form} onSubmit={submitParams} onReset={resetParams}>
					<Text as='h1' size={31} weight={800} family={'open-sans'} uppercase>
						Задайте параметры
					</Text>
					<Select
						ref={fontFamilySelectRef}
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
						ref={fontColorSelectRef}
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
						ref={backgroundColorSelectRef}
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
						ref={contentWidthSelectRef}
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
