document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    
    uploadButton.addEventListener('click', () => {
        if (fileInput.files.length > 0 && fileInput.files[0].name.endsWith('.json')) {
            processFile(fileInput.files[0]);
        } else {
            alert('Veuillez sélectionner un fichier JSON valide.');
        }
    });

    function processFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result);
                const modelCounts = countDefaultModelSlugs(jsonData);
                const carbonFootprint = calculateCarbonFootprint(modelCounts);
                displayCarbonFootprint(carbonFootprint);
            } catch (error) {
                console.error(error);
                alert('Erreur lors du traitement du fichier.');
            }
        };
        reader.readAsText(file);
    }

    const instructionsToggle = document.getElementById('instructionsToggle');
    const instructionsContent = document.getElementById('instructionsContent');
    const toggleIcon = document.querySelector('.toggle-icon');
    if (instructionsToggle && instructionsContent) {
        instructionsToggle.addEventListener('click', () => {
            instructionsContent.classList.toggle('collapsed');
            toggleIcon.classList.toggle('rotate');
        });
    }
});