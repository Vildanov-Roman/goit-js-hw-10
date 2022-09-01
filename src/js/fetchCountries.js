const BASE_URL = 'https://restcountries.com/v3.1/name';
const FIELDS = 'fields=name,capital,population,flags,languages'

export const fetchCountries = name => {
    return fetch(
        `${BASE_URL}/${name}?${FIELDS}`
    )
    .then(response => {
        if (response.status === 404) {
            return [];
            }
            return response.json();
        })
    .catch(error => {
        console.error(error);
    });
};