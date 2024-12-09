const axios = require('axios');

// A helper method to pick one value from a list
const getRandomValue = (values) => {
  const index = Math.floor(Math.random() * values.length);
  return values[index];
};
// Helper method to retrieve a list of breeds
// https://dog.ceo/dog-api/documentation/
// returns a Promise to an array of breed names

const getBreeds = () => {
  return axios
    .get('https://dog.ceo/api/breeds/list/all')
    .then((response) => {
      return Object.keys(response.data.message);
    })
    .catch(() => {
      console.log('error!');
    });
};

// Helper method to retrieve a random image for a
// specified breed
// https://dog.ceo/dog-api/documentation/breed
// RANDOM IMAGE FROM A BREED COLLECTION
// returns a Promise to a url (string)

const getRandomImageForBreed = (breed) => {
  return axios
    .get(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then((response) => {
      return response.data.message;
    })
    .catch(() => {
      console.log('error!');
    });
};

// use our other helpers to make a function that returns
// a random image from a random breed
// returns a Promise to a url (string)

const getRandomDogImage = () => {
  return getBreeds()
    .then((breeds) => {
      const randomBreed = getRandomValue(breeds); // Call getRandomValue properly
      return getRandomImageForBreed(randomBreed); // Fetch a random image for the breed
    })
    .catch((error) => {
      console.error('Error fetching random dog image:', error);
    });
};

// Example call
getRandomDogImage()
  .then((url) => {
    console.log(url); // Log the random dog image URL
  });
