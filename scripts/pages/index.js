/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const getPhotographers = async () => {
  const { photographers } = await (
    fetch('./data/photographers.json')
      .then((response) => response.json())
  );
  return { photographers };
};

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Get photograph data
  const { photographers } = await getPhotographers();

  // HTML Layout
  await displayData(photographers);
}

init();
