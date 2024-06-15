document.addEventListener('DOMContentLoaded', function() {
    const toggleLinks = document.querySelectorAll('.toggle-link');
    
    toggleLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetContainer = document.getElementById(targetId);
            
            // Hide all containers
            const containers = document.querySelectorAll('.container');
            containers.forEach(container => {
                container.style.display = 'none';
            });
            
            // Show the targeted container
            targetContainer.style.display = 'block';
        });
    });
});
