import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import {
	ArticleStateType,
	OnSubmitChange,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import { useRef, useState } from 'react';
import { Text } from '../text';
import { useOutsideClickClose } from '../hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

export const ArticleParamsForm = ({
	onSubmitChange,
}: {
	onSubmitChange: OnSubmitChange;
}) => {
	const [selectedOptions, setSelectedOptions] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontSizeOption: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	const [isFormActive, setIsFormActive] = useState(false);

	const formRef = useRef<HTMLDivElement | null>(null);

	const handleArrowClick = () => {
		setIsFormActive((prevState) => !prevState);
	};

	const handleSubmitChange = () => {
		onSubmitChange(selectedOptions);
	};

	const resetParams = () => {
		handleResetParams();
		applyReserParams();
	};

	const applyReserParams = () => {
		handleSubmitChange();
	};

	const handleResetParams = () => {
		{
			/* если вернуть прошлую логику в одну функцию, то применяются стили к статье раньше, чем меняются на дефолтные  и только со второого нажатия кнопки, поэтому организовала так, по-другому никак не выходило*/
		}
		setSelectedOptions({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
	};

	const submitParams = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleSubmitChange();
	};

	const onChangeFormElement = (
		option: OptionType,
		propertyName: keyof ArticleStateType
	) => {
		setSelectedOptions((prevOptions) => ({
			...prevOptions,
			[propertyName]: option,
		}));
	};

	useOutsideClickClose({
		isOpen: isFormActive,
		rootRef: formRef,
		onChange: setIsFormActive,
	});

	return (
		<>
			<div ref={formRef}>
				<ArrowButton onClick={handleArrowClick} isActive={isFormActive} />
				<aside
					className={clsx(
						styles.container,
						isFormActive ? styles.container_open : ''
					)}>
					<form
						className={clsx(styles.form)}
						onSubmit={submitParams}
						onReset={resetParams}>
						<Text as='h1' size={31} weight={800} family={'open-sans'} uppercase>
							Задайте параметры
						</Text>{' '}
						{/* у меня и так заголовок формы не меняет шрифт при изменении настроек формы тк нет атрибута dynamic*/}
						<Select
							selected={selectedOptions.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(selected) =>
								onChangeFormElement(selected, 'fontFamilyOption')
							}
							title='Шрифт'
						/>
						<RadioGroup
							name='Размер шрифта'
							selected={selectedOptions.fontSizeOption}
							options={fontSizeOptions}
							onChange={(selected) =>
								onChangeFormElement(selected, 'fontSizeOption')
							}
							title='Размер шрифта'
						/>
						<Select
							selected={selectedOptions.fontColor}
							options={fontColors}
							onChange={(selected) =>
								onChangeFormElement(selected, 'fontColor')
							}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={selectedOptions.backgroundColor}
							options={backgroundColors}
							onChange={(selected) =>
								onChangeFormElement(selected, 'backgroundColor')
							}
							title='Цвет фона'
						/>
						<Select
							selected={selectedOptions.contentWidth}
							options={contentWidthArr}
							onChange={(selected) =>
								onChangeFormElement(selected, 'contentWidth')
							}
							title='Ширина контента'
						/>
						<div className={clsx(styles.bottomContainer)}>
							<Button title='Сбросить' type='reset' onClick={resetParams} />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
