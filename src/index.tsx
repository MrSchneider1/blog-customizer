import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm, StylesToChange } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);



const App = () => {

	const [stylesToChange, setStylesToChange] = useState({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties)

	const handleChangeStyles = (newStyles: StylesToChange) => {
		const updatedStyles: CSSProperties = Object.keys(newStyles).reduce(
			(acc, key) => ({
			  ...acc,
			  [key as keyof CSSProperties]: newStyles[key as keyof StylesToChange],
			}),
			{} as CSSProperties
		  );
		  setStylesToChange(updatedStyles);
	}

	return (
		<div
			className={clsx(styles.main)}
			style={{...stylesToChange}}>
			<ArticleParamsForm onSubmitChange={handleChangeStyles} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
