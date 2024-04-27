import type { Meta, StoryObj } from '@storybook/react';

import { ArticleParamsForm } from './ArticleParamsForm';
import { StylesToChange } from 'src/constants/articleProps';


const meta: Meta<typeof ArticleParamsForm> = {
	component: ArticleParamsForm,
};

export default meta;
type Story = StoryObj<typeof ArticleParamsForm>;

export const ArticleParamsFormStory: Story = {
	render: () => {
		const handleChangeStyles = (newStyles: StylesToChange) => {
			console.log('стили изменились:', newStyles);
		  }

		return (
			<>
				<ArticleParamsForm onSubmitChange={handleChangeStyles}/>
			</>
		);
	},
};