import styles from './People.css';

export enum AttributePeople {
	'name' = 'name',
	'gender' = 'gender',
}

class PeopleCard extends HTMLElement {
	name?: string;
	gender?: string;

	static get observedAttributes() {
		const classAttribute: Record<AttributePeople, null> = {
			name: null,
			gender: null,
		};

		return Object.keys(classAttribute);
	}

	constructor() {
		super();
		this.attachShadow({
			mode: 'open',
		});
	}

	attributeChangedCallback(propName: AttributePeople, oldValue: string | undefined, newValue: string | undefined) {
		this[propName] = newValue;
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <figure>
      <div class = "container-info">
      <span>Name: ${this.name}</span>
      <span>Gender: ${this.gender}</span>
      </div>
      </figure>
      `;
		}
		const cssComponent = this.ownerDocument.createElement('styles');
		cssComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssComponent);
	}
}

customElements.define('single-card-people', PeopleCard);
export default PeopleCard;
