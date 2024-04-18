import { people } from './people';
import { film } from './film';

export type Observer = {
	render: () => void;
} & HTMLElement;

export type AppState = {
	films: film[];
	favoriteFilms: film[];
	peopleList: people[];
};

export enum peopleActions {
	'SHOW' = 'SHOW',
}

export enum favoriteFilmsActions {
	'ADD' = 'ADD',
}

export enum filmActions {
	'GET' = 'GET',
}

export interface showPeopleActions {
	action: peopleActions.SHOW;
	payload: people[];
}

export interface addFavoriteFilmActions {
	action: favoriteFilmsActions.ADD;
	payload: film;
}

export interface getFilmActions {
	action: filmActions.GET;
	payload: film[];
}

export type Actions = showPeopleActions | addFavoriteFilmActions | getFilmActions;
