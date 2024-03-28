export const useRequestDeleteTask = (setIsCreating, refreshTasks) => {
	const requestDeleteTask = ({ target }) => {
		setIsCreating(true);
		fetch(`http://localhost:3005/tasks/${target.id}`, {
			method: 'DELETE',
		})
			.then(() => refreshTasks())
			.finally(() => setIsCreating(false));
	};

	return { requestDeleteTask };
};
