import type { Meta, StoryObj } from '@storybook/react';

import { ArticleParamsForm } from './ArticleParamsForm';
import { ArticleStateType } from 'src/constants/articleProps';

const meta: Meta<typeof ArticleParamsForm> = {
	component: ArticleParamsForm,
};

export default meta;
type Story = StoryObj<typeof ArticleParamsForm>;

export const ArticleParamsFormStory: Story = {
	render: () => {
		const handleChangeStyles = (newStyles: ArticleStateType) => {
			console.log('стили изменились:', newStyles);
		};

		return (
			<>
				<ArticleParamsForm onSubmitChange={handleChangeStyles} />
			</>
		);
	},
};
