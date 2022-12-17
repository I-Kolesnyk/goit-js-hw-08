import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('input', throttle(handleFormItemsInput, 500));
formRef.addEventListener('submit', handleFormSubmit);

let formData = {
  email: '',
  message: '',
};

function handleFormItemsInput(event) {
  if (event.target.name === 'email') {
    formData.email = event.target.value;
  } else if ((event.target.name = 'message')) {
    formData.message = event.target.value;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData || {}));
}

function handleFormSubmit(event) {
  stopDefaultActions(event);
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
}

(function addDataFromLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!savedData) {
    return;
  }
  formRef.elements.email.value = savedData.email;
  formRef.elements.message.value = savedData.message;
})();

function stopDefaultActions(event) {
  event.preventDefault();
}
