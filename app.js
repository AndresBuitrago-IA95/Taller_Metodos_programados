document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('#nav-lista li');
    const contentTitle = document.getElementById('content-title');
    const contentText = document.getElementById('content-text');
    const plotDivId = 'plot-div';

    // Function to load an exercise
    const loadEjercicio = (key) => {
        const data = ejerciciosData[key];
        if (!data) return;

        // Update Text
        contentTitle.textContent = data.title;
        contentText.innerHTML = data.content;

        // Trigger MathJax re-render
        if (window.MathJax) {
            MathJax.typesetPromise().catch((err) => console.log(err.message));
        }

        // Render Plotly Graph
        // Clear previous graph safely
        Plotly.purge(plotDivId);
        document.getElementById(plotDivId).innerHTML = ''; // Ensure clean slate
        data.renderPlot(plotDivId);
    };

    // Event listeners
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked
            const li = e.currentTarget;
            li.classList.add('active');
            
            // Load content
            const targetKey = li.getAttribute('data-target');
            // Adding a small fade effect could be done here with CSS transitions
            contentText.style.opacity = '0';
            document.getElementById(plotDivId).style.opacity = '0';
            
            setTimeout(() => {
                loadEjercicio(targetKey);
                contentText.style.opacity = '1';
                contentText.style.transition = 'opacity 0.3s ease';
                document.getElementById(plotDivId).style.opacity = '1';
                document.getElementById(plotDivId).style.transition = 'opacity 0.3s ease';
            }, 150);
        });
    });

    // Load initial state
    loadEjercicio('portada');
});
