// function handleCredentialResponse(response) {
//   if (response.credential) {
//     var credential = response.credential;
//     var id_token = credential.id_token;
//     // Send the id_token to your server for authentication
//     console.log('ID Token: ' + id_token);
//   }
// }

// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do something with the user's ID
//   console.log('Name: ' + profile.getName()); // Do something with the user's name
//   console.log('Email: ' + profile.getEmail()); // Do something with the user's email
//   window.location.href = 'departments.html'

//   // Construct the credential response object
//   var response = {
//     credential: {
//       id_token: googleUser.getAuthResponse().id_token
//     }
//   };

//   // Handle the credential response
//   handleCredentialResponse(response);
// }
document.getElementById('signInForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('students_cred.json')
      .then(response => response.json())
      .then(students => {
          const student = students.find(s => s.username === username && s.password === password);

          if (student) {
              window.location.href = 'departments.html'; // Redirect to the next page
          } else {
              alert('Invalid credentials. Please try again.');
          }
      })
      .catch(error => console.error('Error fetching student data:', error));
});