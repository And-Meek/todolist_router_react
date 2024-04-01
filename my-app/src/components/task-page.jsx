import { useState, useEffect } from 'react';
import { useRequestDeleteTask, useRequestUpdateTask } from '../hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const TaskPage = ({ refreshTasks }) => {
	const [refreshTaskFlag, setRefreshTaskFlag] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const refreshTask = () => setRefreshTaskFlag(!refreshTaskFlag);
	const [isLoading, setIsLoading] = useState(false);
	const [task, setTask] = useState({});

	const { requestDeleteTask } = useRequestDeleteTask(setIsCreating, refreshTask);

	const { setUpadateTask, clickOnUpdateTask, isUpdating, updatedInputRef, updateBtnRef } =
		useRequestUpdateTask(refreshTask, setIsCreating, task.title);

	const navigate = useNavigate();

	const params = useParams();
	useEffect(() => {
		setIsLoading(true);
		fetch(`http://localhost:3005/tasks/${params.id}`)
			.then((loadedData) => loadedData.json())
			.then((loadedTasks) => {
				if (loadedTasks?.id) {
					setTask(loadedTasks);
				} else navigate('/404');
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [refreshTaskFlag, params.id, setTask, navigate]);

	const goBack = () => {
		navigate(-1);
	};

	const handlerDeleteTask = (target) => {
		requestDeleteTask(target);
		setTimeout(() => navigate('/'), 1000);
	};

	const handlerUpdateTask = ({ target }) => {
		setUpadateTask(target.value);
	};
	return !isLoading ? (
		<div className="todosList">
			<button className="backButtom" onClick={goBack}>
				←
			</button>
			<input
				ref={updatedInputRef}
				className="todo"
				defaultValue={task.title}
				disabled={!isUpdating}
				id={task.id}
				onChange={handlerUpdateTask}
			></input>
			<button
				ref={updateBtnRef}
				className={`${'updateTask'} ${isCreating ? 'disabled' : ''}`}
				id={task.id}
				disabled={isCreating}
				onClick={(event) => clickOnUpdateTask(event, refreshTasks)}
			></button>
			<button
				className={`${'deleteTask'} ${isCreating ? 'disabled' : ''}`}
				id={task.id}
				disabled={isCreating}
				onClick={handlerDeleteTask}
			></button>
		</div>
	) : (
		<div className="loader"></div>
	);
};
