'use strict';

//Form elements id
const form = document.getElementById('form');
const submitButton = document.getElementById('submitButton')
const selectForm = document.getElementById('selectForm');
const promoInput = document.getElementById('promoInput');

//Form Input to validate
const nameInput = document.getElementById('nameInput');
const surnameInput = document.getElementById('surnameInput');
const emailInput = document.getElementById('emailInput');
const textareaInput = document.getElementById('textareaInput');
const privacyCheckbox = document.getElementById('privacyCheckbox');

//valid feedback id's
const validModal = new bootstrap.Modal(document.getElementById("validModal"));
const validModalTitle = document.getElementById('validModalTitle');
const validModalText = document.getElementById('validModalText');

//wrong feedback id's
const nameFeedback = document.getElementById('nameFeedback');
const surnameFeedback = document.getElementById('surnameFeedback');
const emailFeedback = document.getElementById('emailFeedback');
const textareaFeedback = document.getElementById('textareaFeedback');
const promoFeedback = document.getElementById('promoFeedback');


//submitButton event listener
form.addEventListener('submit', function (ev) {

  //Ev Prevent Default
  ev.preventDefault()

  //Check current select option value, calculate price based on it
  let basePrice;
  switch (Number(selectForm.value)) {
    case 1:
      basePrice = 20.50 * 10;
      break;
    case 2:
      basePrice = 15.30 * 10;
      break;
    case 3:
      basePrice = 33.60 * 10;
      break;
  }


  //Name and Surname Input Validation
  function isNameSurnameValid(inputElement, inputFeedback) {
    //reset previous states
    inputElement.classList.remove('is-valid', 'is-invalid')

    if (inputElement.value.trim() === "") {
      inputElement.classList.add('is-invalid');
      inputFeedback.innerText = 'Non puoi inserire un valore vuoto';
      return false;

    } else if (!isNaN(inputElement.value)) {
      inputElement.classList.add('is-invalid');
      inputFeedback.innerText = 'Non puoi inserire un numero'
      return false;

    } else {
      inputElement.classList.add('is-valid');
      return true;
    }
  }


  //Email Validation
  function emailRegexValidation(email) {
    const regex = /^[^\s@]+@[^\s@]+\.(it|com|net|org|edu)$/
    return regex.test(email)
  }

  function isEmailValid(email, feedback) {
    email.classList.remove('is-invalid', 'is-valid');

    if (!emailRegexValidation(email.value.trim())) {
      email.classList.add('is-invalid');
      feedback.innerText = 'La mail inserita non è valida'
      return false;
    } else {
      email.classList.add('is-valid');
      return true;
    }
  }

  //Job Description Validation
  function isJobDescValid(jobdesc, jobfeedback) {
    //reset previous states
    jobdesc.classList.remove('is-valid', 'is-invalid');

    if (jobdesc.value.trim() === "") {
      jobdesc.classList.add('is-invalid');
      jobfeedback.innerText = 'Inserisci una descrizione del lavoro';
      return false;
    } else {
      jobdesc.classList.add('is-valid');
      return true;
    }
  }


  //Privacy checkbox validation
  function privacyChecked() {

    privacyCheckbox.classList.remove('is-valid', 'is-invalid');

    if (!privacyCheckbox.checked) {
      privacyCheckbox.classList.add('is-invalid');
      return false;
    } else {
      privacyCheckbox.classList.add('is-valid');
      return true;
    }
  }

  //Promocode Validation
  function isPromoValid(promocodeInserted) {
    //reset previous states
    promoInput.classList.remove('is-invalid', 'is-valid');

    //Check if promo is valid
    const promoAvailable = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24'];

    if (promoAvailable.includes(promocodeInserted)) {
      validModalTitle.innerHTML = `Sconto applicato!`
      validModalText.innerHTML = `Sconto del 25% applicato, invece di ${basePrice}€ pagherai soltanto ${basePrice * 0.75}€`;
      promoInput.classList.add('is-valid');
      validModal.show();
    } else {
      promoInput.classList.add('is-invalid');
      promoFeedback.innerText = 'Il Promocode inserito non è valido. Verifica che sia scritto correttamente per poterlo utilizzare';
    }
  }


  //Call all validation functions
  isNameSurnameValid(nameInput, nameFeedback);
  isNameSurnameValid(surnameInput, surnameFeedback);
  isEmailValid(emailInput, emailFeedback);
  isJobDescValid(textareaInput, textareaFeedback);

  const isValidForm =
    isNameSurnameValid(nameInput, nameFeedback) &&
    isNameSurnameValid(surnameInput, surnameFeedback) &&
    isEmailValid(emailInput, emailFeedback) &&
    isJobDescValid(textareaInput, textareaFeedback)
    privacyChecked();
    

  
  //If all forms valid, check promocode
  if (isValidForm) {
    if (promoInput.value.trim() === "") {
      //reset previous states
      promoInput.classList.remove('is-invalid');

      validModalTitle.innerHTML = `Preventivo Inoltrato`;
      validModalText.innerHTML = `Il costo del progetto è di ${basePrice}€`;
      validModal.show();
    } else {
      isPromoValid(promoInput.value.trim());
    }
  }
})
