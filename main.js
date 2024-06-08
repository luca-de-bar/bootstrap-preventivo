'use strict';

// Form elements
const elements = {
    form: document.getElementById('form'),
    submitButton: document.getElementById('submitButton'),
    selectForm: document.getElementById('selectForm'),
};

// Input elements, feedback elements, and feedback text
const inputs = {
    name: {
        element: document.getElementById('nameInput'),
        feedback: document.getElementById('nameFeedback'),
        feedbackText: {
            empty: 'Non puoi inserire un valore vuoto',
            isNumeric: 'Non puoi inserire un numero'
        }
    },
    surname: {
        element: document.getElementById('surnameInput'),
        feedback: document.getElementById('surnameFeedback'),
        feedbackText: {
            empty: 'Non puoi inserire un valore vuoto',
            isNumeric: 'Non puoi inserire un numero'
        }
    },
    email: {
        element: document.getElementById('emailInput'),
        feedback: document.getElementById('emailFeedback'),
        feedbackText: {
            invalid: 'La mail inserita non è valida'
        }
    },
    textarea: {
        element: document.getElementById('textareaInput'),
        feedback: document.getElementById('textareaFeedback'),
        feedbackText: {
            empty: 'Non puoi inserire un valore vuoto'
        }
    },
    privacy: {
        element: document.getElementById('privacyCheckbox'),
        feedback: document.getElementById('privacyFeedback'),
        feedbackText: {
            invalid: 'Devi accettare la Privacy Policy'
        }
    },
    promo: {
        element: document.getElementById('promoInput'),
        feedback: document.getElementById('promoFeedback'),
        feedbackText: {
            invalid: 'Il Promocode inserito non è valido. Verifica che sia scritto correttamente per poterlo utilizzare',
            success: (basePrice) => `Sconto del 25% applicato, invece di ${basePrice}€ pagherai soltanto ${basePrice * 0.75}€. Riceverai il preventivo all'indirizzo e-mail specificato`
        }
    }
};

// Modal elements
const modal = {
    validModal: new bootstrap.Modal(document.getElementById("validModal")),
    validModalTitle: document.getElementById('validModalTitle'),
    validModalText: document.getElementById('validModalText')
};

//Generic function, reset elements previous states.
function resetState(element) {
    element.classList.remove('is-valid', 'is-invalid');
}

//Generic function if input Empty
function isEmpty(input) {
    resetState(input.element);
    if (input.element.value.trim() === "") {
        input.element.classList.add('is-invalid');
        input.feedback.innerText = input.feedbackText.empty;
        return true;
    }
    return false;
}

//Generic function if input Numeric
function isNumeric(input) {
    resetState(input.element);
    if (!isNaN(input.element.value)) {
        input.element.classList.add('is-invalid');
        input.feedback.innerText = input.feedbackText.isNumeric;
        return true;
    }
    return false;
}

//Email REGEX
function emailRegexValidation(email) {
    const regex = /^[^\s@]+@[^\s@]+\.(it|com|net|org|edu|eu)$/;
    return regex.test(email);
}

//if Email is valid, based on REGEX.
function isEmailValid(input) {
    resetState(input.element);
    if (!emailRegexValidation(input.element.value.trim())) {
        input.element.classList.add('is-invalid');
        input.feedback.innerText = input.feedbackText.invalid;
        return false;
    }
    input.element.classList.add('is-valid');
    return true;
}

//if privacy checkbox is checked
function privacyChecked() {
    resetState(inputs.privacy.element);
    if (!inputs.privacy.element.checked) {
        inputs.privacy.element.classList.add('is-invalid');
        inputs.privacy.feedback.innerText = inputs.privacy.feedbackText.invalid;
        return false;
    }
    inputs.privacy.element.classList.add('is-valid');
    return true;
}

//Validate promocode
function isPromoValid(promocodeInserted, basePrice) {
    resetState(inputs.promo.element);

    const promoAvailable = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24'];

    if (promoAvailable.includes(promocodeInserted)) {
        modal.validModalTitle.innerText = `Sconto applicato!`;
        modal.validModalText.innerText = inputs.promo.feedbackText.success(basePrice);
        inputs.promo.element.classList.add('is-valid');
        modal.validModal.show();
    } else {
        inputs.promo.element.classList.add('is-invalid');
        inputs.promo.feedback.innerText = inputs.promo.feedbackText.invalid;
    }
}

// SubmitButton event listener
elements.form.addEventListener('submit', function (ev) {
    // Ev Prevent Default
    ev.preventDefault();

    // Check current select option value, calculate price based on it
    let basePrice;
    switch (Number(elements.selectForm.value)) {
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

    // Validate name and surname
    const isNameValid = !isEmpty(inputs.name) && !isNumeric(inputs.name);
    const isSurnameValid = !isEmpty(inputs.surname) && !isNumeric(inputs.surname);

    //Validate all inputs
    const isValidForm =
        isNameValid &&
        isSurnameValid &&
        isEmailValid(inputs.email) &&
        !isEmpty(inputs.textarea) &&
        privacyChecked();

    // If inputs valid, check promocode.
    if (isValidForm) {
        if (inputs.promo.element.value.trim() === "") {
            resetState(inputs.promo.element);
            modal.validModalTitle.innerText = `Preventivo Inoltrato`;
            modal.validModalText.innerText = `Il costo del progetto è di ${basePrice}€. Riceverai il preventivo all'indirizzo e-mail specificato.`;
            modal.validModal.show();
        } else {
            isPromoValid(inputs.promo.element.value.trim(), basePrice);
        }
    }
});