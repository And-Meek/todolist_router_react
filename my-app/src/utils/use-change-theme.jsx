import { useState } from 'react';

export const useChangeTheme = () => {
	const [theme, setTheme] = useState('dark');

	const changeTheme = () => {
		if (theme === 'dark') {
			setTheme('light');
		} else {
			setTheme('dark');
		}
	};

	return {
		theme,
		changeTheme,
	};
};
