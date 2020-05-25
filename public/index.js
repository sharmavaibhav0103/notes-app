const regForm = document.getElementById('register-form');

regForm.addEventListener('submit', function(e){
  e.preventDefault();
  const rawData = $('#register-form').serializeArray();
  console.log(rawData);
  name = rawData[0].value;
  email = rawData[1].value;
  password = rawData[2].value

  const userData = {
    "name": name,
    "email": email,
    "password": password
  };

  //Sending the user
  fetch('/users/register', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(userData)
  })
  .then(res => res.json())
  .then(({ error, errors, user }) => {
      if(error) window.alert(error);
      if(errors) window.alert(errors[0].msg);
      if(user) location.href = '/login.html';
  })
  .catch(err => console.log(err))
})