var sendCardButton = document.getElementById('sendCardButton');

var modalWindow = document.getElementsByClassName('modal')[0];
var form = document.getElementsByClassName('modal__form')[0];
var info = document.getElementsByClassName('modal__info')[0];

var nameField = document.getElementsByClassName('modal__field modal__field--name')[0];
var textField = document.getElementsByClassName('modal__field modal__field--text')[0];

var nameErrorMessage = document.getElementsByClassName('modal__error modal__error--name')[0];
var textErrorMessage = document.getElementsByClassName('modal__error modal__error--text')[0];

var nameErrorIcon = document.getElementsByClassName('modal__icon modal__icon--name modal__icon--error')[0];
var nameGoodIcon = document.getElementsByClassName('modal__icon modal__icon--name modal__icon--good')[0];

var textErrorIcon = document.getElementsByClassName('modal__icon modal__icon--text modal__icon--error')[0];
var textGoodIcon = document.getElementsByClassName('modal__icon modal__icon--text modal__icon--good')[0];

var closeButtons = document.getElementsByClassName('modal__close-button');

var trexNumber = document.getElementsByClassName('modal__number')[0];

function openModalWindow(event) {
  event.preventDefault();
  modalWindow.classList.add('modal--active');
  form.classList.add('modal__form--active');
}

function closeModalWindow(event) {
  event.preventDefault();
  modalWindow.classList.remove('modal--active');
  info.classList.remove('modal__info--active');
}

function validateForm() {
  var result = true;

  if (nameField.value == '') {
    nameField.classList.remove('modal__field--good');
    nameGoodIcon.classList.remove('modal__icon--active');
    
    nameField.classList.add('modal__field--error');
    nameErrorIcon.classList.add('modal__icon--active');
    nameErrorMessage.classList.add('modal__error--active');

    result = false;
  } else {
    nameField.classList.add('modal__field--good');
    nameGoodIcon.classList.add('modal__icon--active');
    
    nameField.classList.remove('modal__field--error');
    nameErrorIcon.classList.remove('modal__icon--active');
    nameErrorMessage.classList.remove('modal__error--active');
  }

  if (textField.value == '') {
    textField.classList.remove('modal__field--good');
    textGoodIcon.classList.remove('modal__icon--active');
    
    textField.classList.add('modal__field--error');
    textErrorIcon.classList.add('modal__icon--active');
    textErrorMessage.classList.add('modal__error--active');

    result = false;
  } else {
    textField.classList.add('modal__field--good');
    textGoodIcon.classList.add('modal__icon--active');
    
    textField.classList.remove('modal__field--error');
    textErrorIcon.classList.remove('modal__icon--active');
    textErrorMessage.classList.remove('modal__error--active');
  }

  return result;
}

function clearForm() {
    nameField.classList.remove('modal__field--good');
    nameField.classList.remove('modal__field--error');
    nameErrorIcon.classList.remove('modal__icon--active');
    nameGoodIcon.classList.remove('modal__icon--active');
    nameErrorMessage.classList.remove('modal__error--active');

    textField.classList.remove('modal__field--good');
    textField.classList.remove('modal__field--error');
    textErrorIcon.classList.remove('modal__icon--active');
    textGoodIcon.classList.remove('modal__icon--active');
    textErrorMessage.classList.remove('modal__error--active');

    nameField.value = '';
    textField.value = '';
}

function updateNumber() {
  if (localStorage.getItem('trexnumber') != null) {
    var num = localStorage.getItem('trexnumber');
    num++;
    localStorage.setItem('trexnumber', num);
  } else {
    localStorage.setItem('trexnumber', 1);
  }
}

function writeNumber() {
  if (localStorage.getItem('trexnumber') != null) {
    trexNumber.textContent = localStorage.getItem('trexnumber');
  }
}

function submitForm(event) {
  event.preventDefault();

  if (validateForm()) {
    var xhr = new XMLHttpRequest();
    var params = 'name=' + encodeURIComponent(nameField.value)  + 
      'congratulation=' + encodeURIComponent(textField.value);

    xhr.open('GET', './server?' + params, true);

    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;

      if (this.status != 200) {
        console.log('AJAX request failed')
        return;
      }
    }

    xhr.send();

    updateNumber();
    writeNumber();

    form.classList.remove('modal__form--active');
    info.classList.add('modal__info--active');

    clearForm();
  }
}

form.onsubmit = submitForm;
sendCardButton.onclick = openModalWindow;

for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].onclick = closeModalWindow;
}

