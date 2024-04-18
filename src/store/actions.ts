import {
	peopleActions,
	favoriteFilmsActions,
	filmActions,
	showPeopleActions,
	addFavoriteFilmActions,
	getFilmActions,
} from '../types/store';

import { getFilms } from '../data/dataFetchFilms';

export const getFilmList = async (): Promise<getFilmActions> => {
	const films = await getFilms();
	return {
		action: filmActions.GET,
		payload: films,
	};
};

export const AddFavoriteFilm = ({ payload }: Pick<addFavoriteFilmActions, 'payload'>): addFavoriteFilmActions => {
	return {
		action: favoriteFilmsActions.ADD,
		payload,
	};
};

export const showPeople = ({ payload }: Pick<showPeopleActions, 'payload'>): showPeopleActions => {
	return {
		action: peopleActions.SHOW,
		payload,
	};
};
