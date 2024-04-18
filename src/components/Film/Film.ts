import styles from './Film.css';

export enum Attribute {
	'Title' = 'Title',
	'original_title' = 'original_title',
	'release_date' = 'release_date',
	'description' = 'description',
	'director' = 'director',
	'people' = 'people',
}

class FilmCard extends HTMLElement {
	Title?: string;
	original_title?: string;
	release_date?: string;
	description?: string;
	director?: string;
	people?: Array<string>;

	static get observedAttributes() {
		const classAttribute: Record<Attribute, null> = {
			Title: null,
			original_title: null,
			release_date: null,
			description: null,
			director: null,
			people: null,
		};

		return Object.keys(classAttribute);
	}

	constructor() {
		super();
		this.attachShadow({
			mode: 'open',
		});
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attribute.people:
				if (newValue) {
					this.people = JSON.parse(newValue);
				} else {
					this.people = undefined;
				}
				break;

			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <figure>
      <h3>${this.Title}</h3>
      <div class = "container-info">
      <span>Original Title: ${this.original_title}</span>
      <span>Release Date: ${this.release_date}</span>
      <p>Description: ${this.description}</p>
      <span>Director: ${this.director}</span>
      </div>
      </figure>
      `;
		}
		const cssComponent = this.ownerDocument.createElement('styles');
		cssComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssComponent);
	}
}

customElements.define('single-card-film', FilmCard);
export default FilmCard;
