/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-undef */
async function getPhotographer() {
  // Get Id from URL
  const id = window.location.search.split('id=')[1];

  const photographerData = await (
    fetch('./data/photographers.json')
      .then((response) => response.json())
  );

  // eslint-disable-next-line prefer-destructuring
  photographerData.photographers = photographerData.photographers.filter((photographer) => photographer.id == id)[0];
  photographerData.media = photographerData.media.filter((media) => media.photographerId == id);

  return photographerData;
}

// display data dynamically for each photographer
function displayPhotographerData(photographer) {
  const photographersSection = document.getElementById('photographeInfos');
  const profileModel = photographerFactory(photographer);
  const profiles = profileModel.getProfilePage();
  photographersSection.appendChild(profiles);
}

// display media data dynamically for each photographer
function displayMediaData(photographerMedias) {
  const photographersSection = document.getElementById('photographeMedias');

  photographersSection.innerHTML = '';

  photographerMedias.forEach((media) => {
    const mediasModel = photographerFactory(media);
    const medias = mediasModel.getMediaPage();
    photographersSection.appendChild(medias);
  });

  // Get the number of likes of every medias
  const totalLikeModel = photographerFactory(photographerMedias);
  totalLikeModel.getTotalLikes();
}

function displayNameContactData(photographerContact) {
  const photographerName = document.querySelector('.contact-header');
  const contactModel = photographerFactory(photographerContact);
  const contact = contactModel.getContactNameDOM();
  photographerName.appendChild(contact);
}

// Init all function
async function init() {
  // Photograph data
  const photographerData = await getPhotographer();

  // Add every medias of the photograph to an array to sort them
  let mediaArray = photographerData.media;

  // HTML Layout
  displayPhotographerData(photographerData.photographers);
  mediaArray = sortMedia('popularite', mediaArray);
  displayMediaData(mediaArray);
  displayNameContactData(photographerData.photographers);

  // Event to sort media
  document.getElementById('dropdown').addEventListener('click', (e) => {
    document.getElementById('sort-button-content').innerHTML = e.target.innerHTML;
    mediaArray = sortMedia(e.target.id, mediaArray);
    displayMediaData(mediaArray);
  });

  // Event to add likes
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('incrementLike')) {
      incrementLike(e.target);
    }
  });

  // Init Lightbox on click

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('lightboxMedia')) {
      initLightbox();
    }
  });
  // Using keyboard for lightbox
  document.addEventListener('keydown', (e) => {
    keyDown(e);
  });

  // Show form value in the console
  document.getElementById('send').addEventListener('click', (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(document.getElementById('firstname').value, document.getElementById('lastname').value, document.getElementById('email').value);
  });
}

init();
