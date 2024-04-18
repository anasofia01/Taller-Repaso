import {
	Actions,
	AppState,
	peopleActions,
	favoriteFilmsActions,
	filmActions,
	showPeopleActions,
	addFavoriteFilmActions,
	getFilmActions,
} from '../types/store';
import { showPeople } from './actions';

export const reducer = (currentAction: Actions, currentState: AppState): AppState => {
	const { action, payload } = currentAction;
	switch (action) {
		case favoriteFilmsActions.ADD:
			return {
				...currentState,
				favoriteFilms: [payload, ...currentState.favoriteFilms],
			};
		case filmActions.GET:
			return {
				...currentState,
				films: payload,
			};
		case peopleActions.SHOW:
			return {
				...currentState,
				peopleList: payload,
			};
		default:
			return currentState;
	}
};
