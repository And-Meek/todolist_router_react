export const useRequestFindTasks = (isSorted, sortTasks, tasks, setFilteredTasks) => {
	const requestFindTask = ({ target }) => {
		console.log('find', isSorted);
		if (target.value.length !== 0) {
			if (isSorted) {
				const filteredTasksArray = sortTasks.filter((task) => {
					return task.title.includes(target.value);
				});
				return () => setFilteredTasks(filteredTasksArray);
			} else {
				const filteredTasksArray = tasks.filter((task) => {
					return task.title.includes(target.value);
				});
				return () => setFilteredTasks(filteredTasksArray);
			}
		}
		if (isSorted) {
			return () => setFilteredTasks(sortTasks);
		}
		return () => setFilteredTasks(tasks);
	};

	return {
		requestFindTask,
	};
};
