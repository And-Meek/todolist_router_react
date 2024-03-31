import { useNavigate } from 'react-router-dom';
import errorIcon from '../assets/free-png.ru-856.png';

export const NotFound = () => {
	const navigateToMainPage = useNavigate();
	const backToMainPage = () => navigateToMainPage('/');

	return (
		<>
			<button className="backButtom" onClick={backToMainPage}>
				←
			</button>
			<img src={errorIcon} alt="космос" />
			<div className="notFound">
				Здесь только бескрайний космос! Попробуй другую страницу
			</div>
		</>
	);
};
