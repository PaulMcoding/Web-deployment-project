
function getUserID() {
    console.log('Start fetching User ID...');
    fetch('/getUserId', {
      method: 'GET',
      credentials: 'same-origin',
    })
  
    .then(response => {
      console.log('Response status:', response.status);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch user ID');
      }
    })
    
    .then(data => {
      console.log('User ID data:', data);
          if (data.userID != null) {
            document.getElementById('authButton').style.display = 'none';
            document.getElementById('authButton2').style.display = 'block';
            document.getElementById('authButton3').style.display = 'block';
            document.getElementById('authButton4').style.display = 'block';
            userlogged = 1
          } else {
            document.getElementById('authButton').style.display = 'block';
            document.getElementById('authButton2').style.display = 'none';
            document.getElementById('authButton3').style.display = 'none';
            document.getElementById('authButton4').style.display = 'none';
            userlogged = 2
          }
        })
        .catch(error => {
          console.error('Error fetching user ID:', error);
        });
      }
  
      window.onload = function() {
        getUserID();
      };