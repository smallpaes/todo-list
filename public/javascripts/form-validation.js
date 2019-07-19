// (function () {
//   'use strict'

//   function validatePassword() {
//     if (password.value !== password2.value) {
//       return password2.setCustomValidity('Password does not match')
//     }
//     return password2.setCustomValidity('')
//   }


//   window.addEventListener('load', () => {
//     // fetch the form
//     const form = document.querySelector('.needs-validation')
//     form.addEventListener('submit', event => {
//       // if any invalid input exists
//       if (form.checkValidity() === false) {
//         event.preventDefault()
//         event.stopPropagation()
//       }
//       form.classList.add('was-validated')
//     }, false)

//     // check matching password
//     const password = document.getElementById('password') || null
//     const password2 = document.getElementById('password2') || null
//     if (!password || !password2) { return }

//     password.addEventListener('input', validatePassword)
//     password2.addEventListener('input', validatePassword)

//   }, false)
// })()