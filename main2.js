//Su questo file sto eseguendo delle prove

'use strict';

//Form elements id
const form = document.getElementById('form');
const submitButton = document.getElementById('submitButton')
const selectForm = document.getElementById('selectForm');

//valid feedback id's
const validModal = new bootstrap.Modal(document.getElementById("validModal"));
const validModalTitle = document.getElementById('validModalTitle');
const validModalText = document.getElementById('validModalText');


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

    //INPUT VALIDATION
        const inputToValidate = [
    {
        inputElement: document.getElementById('nameInput'),
        feedbackElement: document.getElementById('nameFeedback'),
        inputFeedback: ['Questo campo non può essere vuoto', 'Non puoi inserire un numero'],
        typeofValidation: [isEmpty, isNumeric]
    },
    {
        inputElement: document.getElementById('surnameInput'),
        feedbackElement: document.getElementById('surnameFeedback'),
        inputFeedback: ['Questo campo non può essere vuoto', 'Non puoi inserire un numero'],
        typeofValidation: [isEmpty, isNumeric]
    },
    {
        inputElement: document.getElementById('emailInput'),
        feedbackElement: document.getElementById('emailFeedback'),
        inputFeedback: ['La mail inserita non è valida'],
        typeofValidation: [emailRegexValidation]
    },
    {
        inputElement: document.getElementById('textareaInput'),
        feedbackElement: document.getElementById('textareaFeedback'),
        inputFeedback: ['Questo campo non può essere vuoto'],
        typeofValidation: [isEmpty]
    },
    {
        inputElement: document.getElementById('promoInput'),
        feedbackElement: document.getElementById('promoFeedback'),
        inputFeedback: ['Inserisci un Promocode valido o controlla quello inserito'],
        typeofValidation : [isPromoValid]
    },
    {
        inputElement: document.getElementById('privacyCheckbox'),
        feedbackElement: '',
        inputFeedback: ['Devi accettare la Privacy Policy'],
        typeofValidation: [isChecked]
    }
];


    function isEmpty(inputElement, inputFeedback) {
        //reset element previous states
        inputElement.classList.remove('is-invalid');

        if (inputElement.value.trim() === "") {
            inputElement.classList.add('is-invalid');
            inputFeedback.innerHTML = 'Non puoi inserire un valore vuoto';
            return true;
        }
    }

    function isNumeric(inputElement, inputFeedback) {
        //reset element previous states
        inputElement.classList.remove('is-invalid', 'is-valid');

        if (!isNaN(inputElement.value)) {
            inputElement.classList.add('is-invalid');
            inputFeedback.innerText = 'Non puoi inserire un numero';
            return true;
        }
    }

    //Regex Email Validation
    function emailRegexValidation(email) {
        const regex = /^[^\s@]+@[^\s@]+\.(it|com|net|org|edu)$/
        return regex.test(email)
    }


    // //Promocode Validation
    function isPromoValid(promocodeInserted) {
    //reset previous states
        promoInput.classList.remove('is-invalid', 'is-valid');

    //   //Check if promo is valid
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
})
