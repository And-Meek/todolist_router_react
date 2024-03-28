export const useRequestSortTasks = (refreshSorted, setSortTasks, sortTasks) => {
	const requestSortTask = () => {
		refreshSorted();
		setSortTasks(
			sortTasks.sort((a, b) => {
				if (a.title < b.title) {
					return -1;
				}
				if (a.title > b.title) {
					return 1;
				}
				return 0;
			}),
		);
	};

	return {
		requestSortTask,
	};
};
