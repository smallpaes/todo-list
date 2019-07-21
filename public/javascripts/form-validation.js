(function () {
  'use strict'

  function validatePassword() {
    if (password.value !== password2.value) {
      return password2.setCustomValidity('Password does not match')
    }
    return password2.setCustomValidity('')
  }


  window.addEventListener('load', () => {
    // fetch the form
    const form = document.querySelector('.needs-validation')
    // fetch all inputs
    const inputs = document.querySelectorAll('form input')

    form.addEventListener('submit', event => {
      // if any invalid input exists
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      // add shake animation to invalid field
      form.classList.add('was-validated')
      inputs.forEach(inputField => {
        const formInput = inputField.closest('.animateField')
        if (inputField.checkValidity()) { return }
        formInput.classList.add('animated', 'shake')
        // remove animation when animation ends
        formInput.addEventListener('animationend', event => {
          formInput.classList.remove('animated', 'shake')
        })
      })

    }, false)

    // check matching password
    const password = document.getElementById('password') || null
    const password2 = document.getElementById('password2') || null
    if (!password || !password2) { return }

    password.addEventListener('input', validatePassword)
    password2.addEventListener('input', validatePassword)

  }, false)
})()