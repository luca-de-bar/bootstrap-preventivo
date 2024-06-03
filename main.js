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

//Modals for visual feedback (valid and wrong)
const wrongPromo = new bootstrap.Modal(document.getElementById("wrongPromo"));
const validModal = new bootstrap.Modal(document.getElementById("validModal"));
const validModalTitle = document.getElementById('validModalTitle');
const validModalText = document.getElementById('validModalText');


//submitButton event listener
form.addEventListener('submit', function (ev) {

  //Ev Prevent Default
  ev.preventDefault()

  //Check current select element value, calculate price based on it
  const selectFormValue = Number(selectForm.value);
  let basePrice;
  switch (selectFormValue) {
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

  function isPromoValid(promocodeInserted) {
    const promoAvailable = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24'];

    //If Promocode input not empty, then check value in prev. array, return modal
    if (promocodeInserted.trim() != "") {
      if (promoAvailable.includes(promocodeInserted)) {
        validModalTitle.innerHTML = `Sconto applicato!`
        validModalText.innerHTML = `Sconto del 25% applicato, invece di ${basePrice}€ pagherai soltanto ${basePrice * 0.75}€`
        validModal.show()
        return true;
      } else {
        wrongPromo.show()
        return false;
      }
    }
  }

  //If promocode inserted call isPromoValid(), otherwise show validModal
  if (promoInput.value.trim() === "") {
    validModalTitle.innerHTML = `Preventivo Inoltrato`;
    validModalText.innerHTML = `Il costo del progetto è di ${basePrice}€`;
    validModal.show();
  } else {
    isPromoValid(promoInput.value);
  }
})
