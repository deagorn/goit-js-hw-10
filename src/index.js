import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';


axios.defaults.headers.common["x-api-key"] = "live_nDnGxUSc6QSIqWzxEJYgK5YS22OtuO64AgKn50qquKoTigWhbMX4spiQwQQtsX9U";

const refs = {
    breedSelect: document.querySelector(".breed-select"),
    loadingText: document.querySelector('.loader'),
    catInfo: document.querySelector(".cat-info"),
}
refs.loadingText.classList.add("hidden");



fetchBreeds()
  .then(data => data.map(breed => ({ id: breed.reference_image_id, name: breed.name })))
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        refs.breedSelect.appendChild(option);
      });
      new SlimSelect({
      select: refs.breedSelect,
    });
    }).catch(err => {
        refs.catInfo.innerHTML = '';
      Notify.failure(
        'Oops! Something went wrong! Try choose another breed!'
      );
      console.log(err);
    });

refs.breedSelect.addEventListener('change', onSelectCat);

function onSelectCat(e) {
  e.preventDefault();
 
  const breedId = e.target.value;
  refs.catInfo.innerHTML = '';
    refs.loadingText.classList.add("visible");
    refs.loadingText.classList.remove("hidden");

  fetchCatByBreed(breedId)
    .then(data => {
      const breed = data.breeds[0];
      const cat = {
        id: breed.id,
        name: breed.name,
        description: breed.description,
        temperament: breed.temperament,
        url: data.url,
      };
      setTimeout(() => {
        markUpCats(cat);
        refs.loadingText.classList.add("hidden");
        refs.loadingText.classList.remove("visible");
      }, 0);
    })
    .catch(err => {
      Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    refs.loader.classList.add('visually-hidden');
    refs.select.classList.remove('visually-hidden');
    console.log(err);
    });
};

function markUpCats(cat) {
  const markup = `
  <img src="${cat.url}" alt="${cat.name}">
  <div class="breed-box__text"><h2>${cat.name}</h2><p>${cat.description}</p><p><span class="bold">Temperament:</span> ${cat.temperament}</p></div>`;
  refs.catInfo.innerHTML = markup;
}

