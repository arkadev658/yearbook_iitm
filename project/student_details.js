document.addEventListener("DOMContentLoaded", function() {
    // Get the elements where you want to display the student details and comments
    const mainContainer = document.getElementById("maincontainer")
    const imageContainer = document.getElementById("studentcontainer");
    const studentNameElement = document.getElementById("studentName");
    const studentImageElement = document.getElementById("studentImage");
    const studentBioElement = document.getElementById("studentBio")
    const studentProfileElement = document.getElementById("studentProfile")
    const studentCommentsElement = document.getElementById("studentComments");
    const hideButtonProf = document.getElementById("professor-comments");
    const hideButtonJunior = document.getElementById("junior-comments");
    let juniorCommentsContainer = document.getElementById("junior-comments-container");
    let professorCommentsContainer = document.getElementById("professor-comments-container");
  
    // Retrieve the stored name, image, bio, and profile from localStorage
    const selectedStudentName = localStorage.getItem('selectedStudentName');
    const selectedStudentImage = localStorage.getItem('selectedStudentImage');
    const selectedStudentBio = localStorage.getItem('selectedStudentBio');
    const selectedStudentProfile = localStorage.getItem('selectedStudentProfile');
  
    // Set the retrieved name, image, bio, and profile to the corresponding elements
    if (selectedStudentName && selectedStudentImage && selectedStudentBio && selectedStudentProfile) {
        studentNameElement.textContent = selectedStudentName;
        studentBioElement.textContent = selectedStudentBio;
        studentProfileElement.href = selectedStudentProfile;
        studentImageElement.src = selectedStudentImage;
        studentImageElement.alt = selectedStudentName;
  
        // Fetch comments from CSV file
        fetch('comments.csv')
            .then(response => response.text())
            .then(data => {
                const rows = data.split('\n').slice(1); // Exclude header row
  
                // Filter comments for the selected student
                const studentComments = rows.filter(row => {
                    const columns = row.split(',');
                    return columns.length >= 6 && columns[3].trim() === selectedStudentName;
                });
  
                // Generate HTML for each comment and append to studentCommentsElement
                studentComments.forEach(comment => {
                    const columns = comment.split(',');
                    const commentText = columns[4].trim();
                    const commenterName = columns[0].trim();
  
                    const commentBox = document.createElement('div');
                    commentBox.classList.add('comment-box');
  
                    const commentTextElement = document.createElement('p');
                    commentTextElement.textContent = commentText;
                    const commenterNameElement = document.createElement('p');
                    commenterNameElement.textContent = "-" + commenterName;
                    commenterNameElement.classList.add('commenter-name')
  
                    // Append elements to comment box
                    commentBox.appendChild(commentTextElement);
                    commentBox.appendChild(commenterNameElement);
                    
  
                    studentCommentsElement.appendChild(commentBox);
                });
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    } else {
        // If there's no stored data, handle accordingly (e.g., redirect or display a message)
        console.error('No student data found.');
        // Example: Redirect to homepage
        // window.location.href = 'index.html';
    }

    //added part
    hideButtonProf.addEventListener("click", function() {
        if (mainContainer) {
          mainContainer.style.display = "none";
        }
        if (juniorCommentsContainer) {
          juniorCommentsContainer.style.display = "none";
        }
    
        if (!professorCommentsContainer) {
          professorCommentsContainer = document.createElement("div");
          professorCommentsContainer.id = "professor-comments-container";
          document.body.appendChild(professorCommentsContainer);
        }
        professorCommentsContainer.innerHTML = ''; // Clear previous comments
        professorCommentsContainer.style.display = "block"; // Ensure it is displayed
    
        fetch('professor-comments.csv')
          .then(response => response.text())
          .then(data => {
            // Parse CSV data
            const rows = data.split('\n').slice(1); // Remove header row
    
            rows.forEach(row => {
              const columns = row.split(',');
              if (columns.length >= 4) { // Check if there are at least 3 columns
                const name = columns[0].trim();
                const department = columns[1].trim();
                const image = columns[2].trim();
                const comments = columns.slice(3).join(',').trim();
    
                // Create image element
                const img = document.createElement("img");
                img.src = image;
                img.alt = name;
    
                // Create name element
                const nameElement = document.createElement("p");
                nameElement.textContent = name;
                nameElement.classList.add("professor-name");

                //Create department element
                const departmentElement = document.createElement("p");
                departmentElement.textContent = department;
                departmentElement.classList.add("professor-department");
    
                // Create container for image and name
                const infoContainer = document.createElement("div");
                infoContainer.classList.add("professor-info");
                infoContainer.appendChild(img);
                infoContainer.appendChild(nameElement);
                infoContainer.appendChild(departmentElement);
    
                // Create comments element
                const commentsElement = document.createElement("p");
                commentsElement.textContent = comments;
                commentsElement.classList.add("professor-comments");
    
                // Create card container for professor
                const card = document.createElement("div");
                card.classList.add("professor-card");
    
                // Append the info container and comments element to the card container
                card.appendChild(infoContainer);
                card.appendChild(commentsElement);
    
                // Append card to the professor comments container
                professorCommentsContainer.appendChild(card);
              }
            });
          })
          .catch(error => console.error('Error fetching CSV:', error));
      });

      //added junior 
      hideButtonJunior.addEventListener("click", function() {
        if (mainContainer) {
          mainContainer.style.display = "none";
        }
        if (professorCommentsContainer) {
          professorCommentsContainer.style.display = "none";
        }
        
        if (!juniorCommentsContainer) {
          juniorCommentsContainer = document.createElement("div");
          juniorCommentsContainer.id = "junior-comments-container";
          document.body.appendChild(juniorCommentsContainer);
        }
        juniorCommentsContainer.innerHTML = ''; // Clear previous comments
        juniorCommentsContainer.style.display = "block"; // Ensure it is displayed
    
        fetch('junior-comments.csv')
          .then(response => response.text())
          .then(data => {
            // Parse CSV data
            const rows = data.split('\n').slice(1); // Remove header row
    
            rows.forEach(row => {
              const columns = row.split(',');
              if (columns.length >= 4) { // Check if there are at least 3 columns
                const name = columns[0].trim();
                const department = columns[1].trim();
                const image = columns[2].trim();
                const comments = columns.slice(3).join(',').trim();
    
                // Create image element
                const img = document.createElement("img");
                img.src = image;
                img.alt = name;
    
                // Create name element
                const nameElement = document.createElement("p");
                nameElement.textContent = name;
                nameElement.classList.add("junior-name");

                //Create department element
                const departmentElement = document.createElement("p");
                departmentElement.textContent = department;
                departmentElement.classList.add("junior-department");
    
                // Create container for image and name
                const infoContainer = document.createElement("div");
                infoContainer.classList.add("junior-info");
                infoContainer.appendChild(img);
                infoContainer.appendChild(nameElement);
                infoContainer.appendChild(departmentElement);
    
                // Create comments element
                const commentsElement = document.createElement("p");
                commentsElement.textContent = comments;
                commentsElement.classList.add("junior-comments");
    
                // Create card container for junior
                const card = document.createElement("div");
                card.classList.add("junior-card");
    
                // Append the info container and comments element to the card container
                card.appendChild(infoContainer);
                card.appendChild(commentsElement);
    
                // Append card to the junior comments container
                juniorCommentsContainer.appendChild(card);
              }
            });
          })
          .catch(error => console.error('Error fetching CSV:', error));
      });


  });
  
  