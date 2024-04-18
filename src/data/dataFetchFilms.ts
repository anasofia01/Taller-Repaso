export const getFilms = async () => {
	try {
		const films = await fetch('https://ghibliapi.vercel.app/films').then((res) => res.json());
		console.log(films);
		return films;
	} catch (error) {
		console.error(error);
	}
};
