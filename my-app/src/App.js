import themeIcon from './assets/brightness-and-contrast.png';
import './App.css';
import { useState } from 'react';
import { useChangeTheme } from './utils/use-change-theme.jsx';
import style from './utils/useChangeTheme.module.css';
import {
	useRequestAddTask,
	useRequestDeleteTask,
	useRequestGetTasks,
	useRequestUpdateTask,
} from './hooks';

export const App = () => {
	const { theme, changeTheme } = useChangeTheme();
	const [newTask, setNewTask] = useState('');
	const [refreshTasksFlag, setRefreshTasksFlag] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [error, setError] = useState(false);
	const refreshTasks = () => setRefreshTasksFlag(!refreshTasksFlag);
	const { filteredTasks, isLoading, requestSortTask, requestFindTask } =
		useRequestGetTasks(refreshTasksFlag, refreshTasks);

	const { requestAddTask } = useRequestAddTask(
		setIsCreating,
		newTask,
		setError,
		refreshTasks,
		setNewTask,
	);

	const { requestDeleteTask } = useRequestDeleteTask(setIsCreating, refreshTasks);

	const {
		setUpadateTask,
		clickOnUpdateTask,
		isUpdating,
		idRef,
		updatedInputRef,
		updateBtnRef,
	} = useRequestUpdateTask(refreshTasks, setIsCreating);

	const handlerUpdateTask = ({ target }) => {
		setUpadateTask(target.value);
	};

	const handlerNewTask = ({ target }) => {
		setError(false);
		setNewTask(target.value);
	};

	return (
		<div className={`${'App'} ${theme === 'dark' ? style.Dark : style.Light}`}>
			<img src={themeIcon} className="img" alt="toggleTheme" onClick={changeTheme} />
			<span>Todos list</span>
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
						<input
							ref={idRef === id ? updatedInputRef : null}
							className="List"
							defaultValue={title}
							disabled={!isUpdating}
							id={id}
							onChange={handlerUpdateTask}
						></input>
						<button
							ref={idRef === id ? updateBtnRef : null}
							className={`${'updateTask'} ${isCreating ? 'disabled' : ''}`}
							id={id}
							disabled={isCreating}
							onClick={clickOnUpdateTask}
						></button>
						<button
							className={`${'deleteTask'} ${isCreating ? 'disabled' : ''}`}
							id={id}
							disabled={isCreating}
							onClick={requestDeleteTask}
						></button>
					</div>
				))
			)}
		</div>
	);
};
