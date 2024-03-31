import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useRequestAddTask, useRequestGetTasks } from '../hooks';

export const MainPage = () => {
	const [newTask, setNewTask] = useState('');
	const [isCreating, setIsCreating] = useState(false);
	const [error, setError] = useState(false);
	const [refreshTasksFlag, setRefreshTasksFlag] = useState(false);
	const refreshTasks = () => setRefreshTasksFlag(!refreshTasksFlag);
	const { filteredTasks, isLoading, requestSortTask, requestFindTask } =
		useRequestGetTasks(refreshTasksFlag);

	const { requestAddTask } = useRequestAddTask(
		setIsCreating,
		newTask,
		setError,
		refreshTasks,
		setNewTask,
	);

	const handlerNewTask = ({ target }) => {
		setError(false);
		setNewTask(target.value);
	};

	const mainPageParam = useParams();
	return !mainPageParam.id ? (
		<>
			{error ? <span className="error">Поле не может быть пустым!</span> : ''}
			<div className="inputMenu">
				<input
					className="inputTask"
					type="text"
					placeholder="Новая задача..."
					onChange={handlerNewTask}
					value={newTask}
				></input>
				<button
					className={`${'createTask'} ${isCreating ? 'disabled' : ''}`}
					onClick={requestAddTask}
					disabled={isCreating}
				>
					Добавить
				</button>
			</div>
			<div className="searchAndSortMenu">
				<input
					className="inputFind"
					type="text"
					placeholder="Найти задачу..."
					onChange={requestFindTask}
				></input>
				<button
					className={`${'sortTask'} ${isCreating ? 'disabled' : ''}`}
					disabled={isCreating}
					onClick={requestSortTask}
				></button>
			</div>
			{isLoading ? (
				<div className="loader"></div>
			) : (
				filteredTasks.map(({ id, title }) => (
					<div className="todosList" key={id}>
						<NavLink to={`task/${id}`}>
							<div className="List" defaultValue={title} id={id}>
								<p className="text">{title}</p>
							</div>
						</NavLink>
					</div>
				))
			)}
		</>
	) : (
		<Outlet />
	);
};
