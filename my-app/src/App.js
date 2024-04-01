import themeIcon from './assets/brightness-and-contrast.png';
import './App.css';
import { useState } from 'react';
import { useChangeTheme } from './utils/use-change-theme.jsx';
import style from './utils/useChangeTheme.module.css';
//import { useRequestDeleteTask, useRequestGetTasks, useRequestUpdateTask } from './hooks';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './components/main-page.jsx';
import { NotFound } from './components/not-found-page.jsx';
import { TaskPage } from './components/task-page.jsx';

export const App = () => {
	const { theme, changeTheme } = useChangeTheme();
	const [refreshTasksFlag, setRefreshTasksFlag] = useState(false);
	const refreshTasks = () => setRefreshTasksFlag(!refreshTasksFlag);

	return (
		<div className={`${'App'} ${theme === 'dark' ? style.Dark : style.Light}`}>
			<img src={themeIcon} className="img" alt="toggleTheme" onClick={changeTheme} />
			<span>Todos list</span>
			<Routes>
				<Route
					path="/"
					element={
						<MainPage refreshTasks={refreshTasks} refreshTasksFlag={refreshTasksFlag} />
					}
				>
					<Route
						path="task/:id"
						element={
							<TaskPage refreshTasks={refreshTasks} refreshTasksFlag={refreshTasksFlag} />
						}
					/>
				</Route>
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</div>
	);
};
