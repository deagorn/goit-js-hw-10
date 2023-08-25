export function fetchBreeds() {
    return fetch("https://api.thecatapi.com/v1/breeds")
        .then(response => {
            if (!response.ok) {
            throw new Error(response.status);
    }
    return response.json();
  })
  .catch(error => {
      console.log(error);
  });
};

export function fetchCatByBreed (breedId) {
    const BASE_ADRESS = `https://api.thecatapi.com/v1/images/${breedId}`;
    
    return fetch(BASE_ADRESS)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }).then (data => data)
        .catch(error => {
            console.error('Error fetching cat by breed:', error);
            throw error;
        })
}