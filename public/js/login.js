const form = document.getElementById('login-form');

form.addEventListener('submit', function(e){
    e.preventDefault();
    const rawData = $('#login-form').serializeArray();
    email = rawData[0].value;
    password = rawData[1].value
  
    const userData = {
      "email": email,
      "password": password
    };
    fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(({ errors, token, user }) => {
        if(errors) return window.alert(errors);
        //Sending the token to localStorage
        else{
        localStorage.setItem('token', token);
        localStorage.setItem('username', user.name);
        window.alert('Logged in successfully.');
        location.href = '/notes.html';
        }
        
    })
    .catch(err => window.alert(err))
})