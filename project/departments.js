document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.btn.btn-success');
    const departmentOptions = document.querySelectorAll('.dropdown-item');

    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            const department = event.target.dataset.department; // Get department value from button's data attribute
            localStorage.setItem('selectedDepartment', department); // Store department value in localStorage
            window.location.href = 'student_intro.html'; // Redirect to student intro page
        });
    });

    departmentOptions.forEach(option => {
        option.addEventListener('click', function(event) {
            const department = event.target.dataset.department; // Get department value from option's data attribute
            localStorage.setItem('selectedDepartment', department); // Store department value in localStorage
            window.location.href = 'student_intro.html'; // Redirect to student intro page
        });
    });
});
