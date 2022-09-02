import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const  DEBOUNCE_DELAY = 300;


input.addEventListener('input', debounce(elem => {
    const trim = input.value.trim();
        cleanHtml();   
    if (trim !== '') {
        fetchCountries(trim).then(foundData => {      

        if (foundData.length > 10) {
            Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
            );
        } else if (foundData.length === 0) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (foundData.length >= 2 && foundData.length <= 10) {
        renderCountryList(foundData);
        } else  {
            renderCountryInfo(foundData);
        }
        })
    }
    },  DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
    const markup = countries
    .map(country => {
        return `
        <li class="countri-item">
            <img src="${country.flags.svg}" alt="Real flag of ${country.name.official}" class="flag" width="50" hight="50">
            <strong class="country-name">${country.name.official}</strong>
            
        </li>`
    })
    .join('------------------------------------')
    countryList.innerHTML = markup
}

function renderCountryInfo(countries) {
    const markup = countries
        .map(country => {
            return `<li>
                <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="50" hight="50">
                <strong>${country.name.official}</strong>
                <p>Capital: <i>${country.capital}</i></p>
                <p>Population: <i>${country.population}</i></p>
                <p>Languages: <i>${Object.values(country.languages)}</i></p>
            </li>`;
        })
        .join('');
    countryList.innerHTML = markup;    
}

// TODO доделать, чтоб при клике на страну, 
// её название помещалось в input
// и рендерилась карточка страны!

// countryList.addEventListener('click', onClick);

// function onClick(e) {
//     let countryItem = e.target.closest('.country-name');
//     if(countryItem) {
//         input.value = countryItem.textContent;
//         countryList.innerHTML = '';
//     }
// }

function cleanHtml() {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
    }

    // i tried
