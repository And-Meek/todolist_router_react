import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

export const useRequestUpdateTask = (refreshTask, setIsCreating, task) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateTask, setUpadateTask] = useState(task);
	const [idRef, setIdRef] = useState(0);
	const updatedInputRef = useRef(null);
	const updateBtnRef = useRef(null);

	const clickOnUpdateTask = ({ target }) => {
		setIsUpdating(true);
		flushSync(() => {
			setIdRef(target.id);
		});
		if (updateBtnRef.current.className === 'updateTask updatingTask') {
			requestUpdateTask(target);
			updateBtnRef.current.classList.remove('updatingTask');
		} else {
			updateBtnRef.current.classList.add('updatingTask');
			updatedInputRef.current.focus();
		}
	};

	const requestUpdateTask = (target) => {
		setIsCreating(true);
		fetch(`http://localhost:3005/tasks/${target.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({
				title: updateTask,
			}),
		})
			.then(() => {
				setIsUpdating(false);
			})
			.then(() => {
				refreshTask();
			})
			.then(updateBtnRef.current.classList.remove('updatingTask'))
			.finally(() => {
				setIsCreating(false);
			});
	};

	return {
		setUpadateTask,
		clickOnUpdateTask,
		isUpdating,
		idRef,
		updatedInputRef,
		updateBtnRef,
	};
};
