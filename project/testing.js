document.addEventListener("DOMContentLoaded", function() {
    const imageContainer = document.getElementById("image-container");
  
    // Fetch the CSV file
    fetch('students.csv')
      .then(response => response.text())
      .then(data => {
        // Parse CSV data
        const rows = data.split('\n').slice(1); // Remove header row

        let currentRow = null; // To track current row div
        let imageCount = 0; // To track the number of images added in the current row
        
        rows.forEach(row => {
          const columns = row.split(',');
          if (columns.length >= 2) { // Check if there are at least 2 columns
            const name = columns[0].trim();
            const image = columns[1].trim();

            // Create image element
            const img = document.createElement("img");
            img.src = image;
            img.alt = name;

            // Create name element
            const nameElement = document.createElement("p");
            nameElement.textContent = name;

            // Create container for image and name
            const container = document.createElement("div");
            container.classList.add("student-container");
            container.appendChild(img);
            container.appendChild(nameElement);

            if (imageCount % 3 === 0) {
              // If the current row is filled with 3 images, create a new row div
              currentRow = document.createElement("div");
              currentRow.classList.add("row");
              imageContainer.appendChild(currentRow);
            }
            
            // Append container to current row
            currentRow.appendChild(container);

            imageCount++;
          }
        });
      })
      .catch(error => console.error('Error fetching CSV:', error));
});
