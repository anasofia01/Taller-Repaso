import './components/index';
import FilmCard, { Attribute } from './components/Film/Film';
import PeopleCard, { AttributePeople } from './components/People/People';
import styles from './index.css';
import { getFilms } from './data/dataFetchFilms';
import { getPeople } from './data/dataFetchPeople';
import { addObserver, appState, dispatch } from './store';
import { getFilmList, AddFavoriteFilm } from './store/actions';
import { people } from './types/people';

class AppContainer extends HTMLElement {
	cards?: FilmCard[] = [];
	peopleList?: PeopleCard[] = [];
	favoriteCards?: FilmCard[] = [];

	constructor() {
		super();
		this.attachShadow({
			mode: 'open',
		});
		addObserver(this);
		this.showPeople = this.showPeople.bind(this);
	}

	async connectedCallback() {
		console.log('Hola');
		const action = await getFilmList();
		dispatch(action);
		const films = appState.films;

		const promises = films.map(async (film: any) => {
			const filmCard = this.ownerDocument.createElement('single-card-film') as FilmCard;
			filmCard.setAttribute(Attribute.Title, film.title);
			filmCard.setAttribute(Attribute.original_title, film.original_title);
			filmCard.setAttribute(Attribute.release_date, film.release_date);
			filmCard.setAttribute(Attribute.description, film.description);
			filmCard.setAttribute(Attribute.director, film.director);
			filmCard.setAttribute(Attribute.people, JSON.stringify(film.people));
			this.cards?.push(filmCard);
		});

		await Promise.all(promises);
		const favoritesFilms = appState.favoriteFilms;
		const promisesFavorite = favoritesFilms.map(async (film: any) => {
			const filmCard = this.ownerDocument.createElement('single-card-film') as FilmCard;
			filmCard.setAttribute(Attribute.Title, film.title);
			filmCard.setAttribute(Attribute.original_title, film.original_title);
			filmCard.setAttribute(Attribute.release_date, film.release_date);
			filmCard.setAttribute(Attribute.description, film.description);
			filmCard.setAttribute(Attribute.director, film.director);
			this.favoriteCards?.push(filmCard);
		});

		await Promise.all(promisesFavorite);
		this.render();
	}

	favoriteList() {
		console.log('Favorite List');
	}

	async showPeople(person: string) {
		console.log('showPeople');
		const peopleCard = await getPeople(person);
		const card = this.ownerDocument.createElement('single-card-people') as PeopleCard;
		card.setAttribute(AttributePeople.name, peopleCard.name);
		card.setAttribute(AttributePeople.gender, peopleCard.gender);
		this.peopleList?.push(card);
		this.renderPeople();
	}

	renderPeople() {
		if (this.shadowRoot) {
			this.peopleList?.forEach((component) => {
				this.shadowRoot?.appendChild(component);
			});
		}
	}

	render() {
		if (this.shadowRoot) {
			this.cards?.forEach((component) => {
				const favoriteButton = this.ownerDocument.createElement('button');
				favoriteButton.textContent = 'Add Favorites';
				favoriteButton.addEventListener('click', () => {
					dispatch(
						AddFavoriteFilm({
							payload: {
								Title: component.Title,
								original_title: component.original_title,
								release_date: component.release_date,
								description: component.description,
								director: component.director,
							},
						})
					);
					console.log(appState);
				});
				this.shadowRoot?.appendChild(favoriteButton);
				this.shadowRoot?.appendChild(component);

				const showPeople = this.ownerDocument.createElement('button');
				showPeople.textContent = 'Show People';
				showPeople.addEventListener('click', () => {
					component.people?.forEach((person) => {
						this.showPeople(person);
					});
				});
				this.shadowRoot?.appendChild(showPeople);
			});
			this.favoriteCards?.forEach((component) => {
				this.shadowRoot?.appendChild(component);
			});
		}
		const cssComponent = this.ownerDocument.createElement('styles');
		cssComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssComponent);
	}
}

customElements.define('app-container', AppContainer);
