import { useEffect, useState } from 'react';

export const useRequestGetTasks = (refreshTasksFlag) => {
	const [tasks, setTasks] = useState([]);
	const [sortTasks, setSortTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSorted, setIsSorted] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3005/tasks')
			.then((loadedData) => loadedData.json())
			.then((loadedTasks) => {
				setTasks(loadedTasks);
				const futureSort = [...loadedTasks];
				const futureFind = [...loadedTasks];
				setSortTasks(futureSort.toSorted((a, b) => a.title.localeCompare(b.title)));
				setFilteredTasks(futureFind);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [refreshTasksFlag]);

	const requestSortTask = () => {
		if (!isSorted) {
			setFilteredTasks(sortTasks);
		} else {
			setFilteredTasks(tasks);
		}
		setIsSorted(!isSorted);
	};
	const requestFindTask = ({ target }) => {
		if (target.value.length !== 0) {
			if (isSorted) {
				const filteredTasksArray = sortTasks.filter((task) => {
					return task.title.toLowerCase().includes(target.value.toLowerCase());
				});
				return setFilteredTasks(filteredTasksArray);
			} else {
				const filteredTasksArray = tasks.filter((task) => {
					return task.title.toLowerCase().includes(target.value.toLowerCase());
				});
				return setFilteredTasks(filteredTasksArray);
			}
		}
		if (isSorted) {
			return setFilteredTasks(sortTasks);
		}
		return setFilteredTasks(tasks);
	};

	return {
		tasks,
		sortTasks,
		filteredTasks,
		setFilteredTasks,
		isLoading,
		requestSortTask,
		requestFindTask,
	};
};
