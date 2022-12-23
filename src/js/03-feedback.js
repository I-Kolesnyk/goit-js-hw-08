import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('input', throttle(handleFormItemsInput, 500));
formRef.addEventListener('submit', handleFormSubmit);

let formData = {
  email: '',
  message: '',
};
/**
 *
 * @param {*} event
 */
function handleFormItemsInput(event) {
  if (event.target.name === 'email') {
    formData.email = event.target.value;
    formData.message = formRef.elements.message.value;
  } else if ((event.target.name = 'message')) {
    formData.message = event.target.value;
    formData.email = formRef.elements.email.value;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData || {}));
}

/**
 *
 * @param {*} event
 * @returns
 */
function handleFormSubmit(event) {
  stopDefaultActions(event);

  if (!formRef.elements.email.value || !formRef.elements.message.value) {
    alert('Please fill in all the fields!');
    return;
  }
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
/**
 *
 * @param {*} event
 */
function stopDefaultActions(event) {
  event.preventDefault();
}
