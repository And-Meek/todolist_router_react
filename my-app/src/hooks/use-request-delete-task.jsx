export const useRequestDeleteTask = (setIsCreating, refreshTask) => {
	const requestDeleteTask = ({ target }) => {
		setIsCreating(true);
		fetch(`http://localhost:3005/tasks/${target.id}`, {
			method: 'DELETE',
		})
			.then(() => refreshTask())
			.finally(() => setIsCreating(false));
	};

	return { requestDeleteTask };
};
