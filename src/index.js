import './styles.css';
import refs from './js/refs';
import debounce from 'lodash.debounce';
import countryTpl from './templates/countries.hbs'
import oneCountryTpl from './templates/oneCountry.hbs'
import fetchCountries from './js/fetchCountries'
import { info, alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/confirm/dist/PNotifyConfirm.css';

refs.input.addEventListener('input', (debounce( () => {
    if (refs.input.value === null) {
        refs.list.innerHTML = ''
    } else {searchCountry(refs.input.value)}
} )))


function searchCountry(value){
    fetchCountries(value)
        .then(countries => render(countries))
        .catch(() => { if (error.status = '404') { refs.list.innerHTML = '' } })
}

function render(arr) {
    if (arr.length > 10) {
                alert({
                    title: 'To many matches found. Please enter moore specific query!'
                });
            } else if(arr.length === 1){
                renderOneCountry(arr)
            } else {
                renderCountries(arr)
            }
}

function renderCountries(countries) {
    refs.list.innerHTML = ''
    const markup = countryTpl(countries)
    refs.list.insertAdjacentHTML('beforeend', markup)
}

function renderOneCountry(country) {
    refs.list.innerHTML = ''
    const markup = oneCountryTpl(country)
    refs.list.insertAdjacentHTML('beforeend', markup)
}



