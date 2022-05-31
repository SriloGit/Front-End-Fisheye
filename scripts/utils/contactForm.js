/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
// DOM Elements
const formData = document.querySelectorAll('.formData');
const submitBtn = document.querySelector('.send');
const openModal = document.querySelector('.contact_button');

// Regex
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))+$/;
const nameRegExp = /[^0-9<>()\[\]\\.,;:\s@"][A-Za-z]{1,}/;

// DOM form inputs
const first = document.getElementById('firstname');
const last = document.getElementById('lastname');
const email = document.getElementById('email');

function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  // Focus input first name
  first.focus();
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    if (e.target.classList.contains('closeModal')) {
      closeModal();
    }
  }
});

// verify first name
function firstNameInvalid() {
  if (!first.value.match(nameRegExp)) {
    formData[0].setAttribute('data-error-visible', 'true');
    formData[0].setAttribute('data-error', 'Entrez un prénom valide');
    return false;
  }

  formData[0].setAttribute('data-error-visible', 'false');
  return true;
}

// verify last name
function lastNameInvalid() {
  if (!last.value.match(nameRegExp)) {
    formData[1].setAttribute('data-error-visible', 'true');
    formData[1].setAttribute('data-error', 'Entrez un nom valide');
    return false;
  }

  formData[1].setAttribute('data-error-visible', 'false');
  return true;
}

// verify email
function emailInvalid() {
  if (!email.value.match(emailRegExp)) {
    formData[2].setAttribute('data-error-visible', 'true');
    formData[2].setAttribute('data-error', 'Entrez un email valide');
    return false;
  }

  formData[2].setAttribute('data-error-visible', 'false');
  return true;
}

function validate(e) {
  // Prevents systematic page reload on submit
  e.preventDefault();
  if (
    firstNameInvalid()
    && lastNameInvalid()
    && emailInvalid() === true
  ) {
    console.log(first.value, last.value, email.value);
  } else {
    firstNameInvalid();
    lastNameInvalid();
    emailInvalid();
    console.log('Formulaire incomplet');
  }
}

// validate modal form
submitBtn.addEventListener('click', validate);
