document.addEventListener("DOMContentLoaded", function() {
  const mainContainer = document.getElementById("container-2");
  const imageContainer = document.getElementById("image-container");
  const searchInput = document.getElementById("searchInput");
  const hideButtonProf = document.getElementById("professor-comments");
  const hideButtonJunior = document.getElementById("junior-comments");
  let juniorCommentsContainer = document.getElementById("junior-comments-container");
  let professorCommentsContainer = document.getElementById("professor-comments-container");

  // Fetch the CSV file
  fetch('students.csv')
    .then(response => response.text())
    .then(data => {
      // Parse CSV data
      const rows = data.split('\n').slice(1); // Remove header row

      rows.forEach(row => {
        const columns = row.split(',');
        if (columns.length >= 3) { // Check if there are at least 3 columns
          const name = columns[0].trim();
          const image = columns[1].trim();
          const department = columns[2].trim(); // Extract department information
          const bio = columns[3].trim();
          const profile = columns[4].trim();
          const detailsPageUrl = "student_details.html"; // Your details page URL

          // Create image element
          const img = document.createElement("img");
          img.src = image;
          img.alt = name;

          // Create name element
          const nameElement = document.createElement("p");
          nameElement.textContent = name;
          nameElement.classList.add("student-name");

          // Create span element for the material symbol
          const materialSymbol = document.createElement("span");
          materialSymbol.classList.add("material-symbols-outlined");
          materialSymbol.textContent = "engineering";

          // Create card container
          const card = document.createElement("div");
          card.classList.add("card");

          // Append the image and name elements to the card container
          card.appendChild(img);
          card.appendChild(materialSymbol);
          card.appendChild(nameElement);

          // Add click event listener to the card
          card.addEventListener("click", function() {
            // Store the name and image in localStorage
            localStorage.setItem('selectedStudentName', name);
            localStorage.setItem('selectedStudentImage', image);
            localStorage.setItem('selectedStudentBio', bio);
            localStorage.setItem("selectedStudentProfile", profile);
            window.location.href = detailsPageUrl; // Redirect to details page
          });

          // Append card to the image container only if the department matches
          if (department === localStorage.getItem('selectedDepartment')) {
            imageContainer.appendChild(card);
          }
        }
      });
      mainContainer.appendChild(imageContainer);

      // Function to handle search
      function searchNames() {
        const filter = searchInput.value.toUpperCase();
        const cards = imageContainer.getElementsByClassName("card");
        Array.from(cards).forEach(card => {
          const name = card.querySelector(".student-name").textContent.toUpperCase();
          if (name.includes(filter)) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      }

      // Attach search event listener to the input field for live search
      if (searchInput) {
        searchInput.addEventListener("keyup", searchNames);
      }
    })
    .catch(error => console.error('Error fetching CSV:', error));

  function createBackLink() {
    // Create a container for the link
    const linkContainer = document.createElement("div");

    // Create link element for "Back to Student Gallery"
    const backToGalleryLink = document.createElement("a");
    backToGalleryLink.textContent = "Back to Student Gallery";
    backToGalleryLink.href = "student_intro.html"; // Set the href attribute as desired
    // Add a class to the link container
    linkContainer.classList.add("link-container");

    // Create the Google Font icon element
    const icon = document.createElement("span");
    icon.classList.add("material-symbols-outlined"); // Add class for Google Font icons
    icon.textContent = "engineering"; // Set the content of the icon (change "arrow_back" to the desired icon name)

    // Append the icon to the link container
    linkContainer.appendChild(icon);

    // Append the link to the container
    linkContainer.appendChild(backToGalleryLink);

    // Append the link container before the search input if it exists
    if (searchInput && searchInput.parentNode) {
      searchInput.parentNode.insertBefore(linkContainer, searchInput);
      // Remove the search input
      searchInput.parentNode.removeChild(searchInput);
    } 
  }

  // Add click event listener to the hide button
  hideButtonProf.addEventListener("click", function() {
    if (imageContainer) {
      imageContainer.style.display = "none";
    }
    if (juniorCommentsContainer) {
      juniorCommentsContainer.style.display = "none";
    }
    if (searchInput) {
      searchInput.style.display = "none";
    }

    createBackLink();

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
            infoContainer.appendChild(departmentElement)

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
        mainContainer.appendChild(professorCommentsContainer);
      })
      .catch(error => console.error('Error fetching CSV:', error));
  });

  // For junior comments
  hideButtonJunior.addEventListener("click", function() {
    if (imageContainer) {
      imageContainer.style.display = "none";
    }
    if (professorCommentsContainer) {
      professorCommentsContainer.style.display = "none";
    }
    if (searchInput) {
      searchInput.style.display = "none";
    }

    createBackLink();

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
        mainContainer.appendChild(juniorCommentsContainer);
      })
      .catch(error => console.error('Error fetching CSV:', error));
  });
});
