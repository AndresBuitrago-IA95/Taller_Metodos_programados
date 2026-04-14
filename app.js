document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('#nav-lista li');
    const contentTitle = document.getElementById('content-title');
    const contentText = document.getElementById('content-text');
    const plotDivId = 'plot-div';
    
    // Interactive Lab Elements
    const labPanel = document.getElementById('interactive-lab');
    const inputFx = document.getElementById('custom-fx');
    const inputPtsX = document.getElementById('custom-pts-x');
    const inputPtsY = document.getElementById('custom-pts-y');
    const btnCustomPlot = document.getElementById('btn-custom-plot');
    const btnResetPlot = document.getElementById('btn-reset-plot');

    let currentTargetKey = 'portada';

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
        Plotly.purge(plotDivId);
        document.getElementById(plotDivId).innerHTML = ''; 
        if (data.renderPlot) {
            data.renderPlot(plotDivId);
            
            if (key !== 'portada') {
                labPanel.classList.remove('hidden');
                // Clear inputs
                inputFx.value = '';
                inputPtsX.value = '';
                inputPtsY.value = '';
            } else {
                labPanel.classList.add('hidden');
            }
        }
    };

    // Custom Ploting Logic via Math.js
    btnCustomPlot.addEventListener('click', () => {
        const expression = inputFx.value.trim();
        const ptsXStr = inputPtsX.value.trim();
        const ptsYStr = inputPtsY.value.trim();
        
        if (!expression) {
            alert('Por favor ingrese una función válida en x (Ej: sin(x) + 2).');
            return;
        }

        try {
            // Compile expression for fast evaluation
            const code = math.compile(expression);

            let xValues = [];
            let yValues = [];
            
            // Standard evaluation range (-5 to 5)
            for (let i = -5; i <= 5; i += 0.05) {
                xValues.push(i);
                yValues.push(code.evaluate({ x: i }));
            }

            const traceLine = {
                x: xValues,
                y: yValues,
                mode: 'lines',
                line: { color: '#0ea5e9', width: 2 },
                name: 'f(x) Custom'
            };

            const plotData = [traceLine];

            // Parse custom points if provided
            if (ptsXStr && ptsYStr) {
                const pX = ptsXStr.split(',').map(n => parseFloat(n.trim()));
                const pY = ptsYStr.split(',').map(n => parseFloat(n.trim()));
                
                if (pX.length > 0 && pX.length === pY.length) {
                    plotData.push({
                        x: pX,
                        y: pY,
                        mode: 'markers+text',
                        marker: { color: '#ef4444', size: 10 },
                        name: 'Mis Puntos'
                    });
                }
            }

            const layout = {
                title: 'Gráfico Personalizado',
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                font: { color: '#f1f5f9' },
                xaxis: { gridcolor: '#1e293b' },
                yaxis: { gridcolor: '#1e293b' }
            };

            Plotly.newPlot(plotDivId, plotData, layout);

        } catch (error) {
            alert('Error al evaluar la función: ' + error.message);
        }
    });

    btnResetPlot.addEventListener('click', () => {
        // Rerender original plot
        const data = ejerciciosData[currentTargetKey];
        if (data && data.renderPlot) {
            Plotly.purge(plotDivId);
            document.getElementById(plotDivId).innerHTML = '';
            data.renderPlot(plotDivId);
        }
    });

    // Event listeners
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked
            const li = e.currentTarget;
            li.classList.add('active');
            
            // Load content
            currentTargetKey = li.getAttribute('data-target');
            // Adding a small fade effect could be done here with CSS transitions
            contentText.style.opacity = '0';
            document.getElementById(plotDivId).style.opacity = '0';
            
            setTimeout(() => {
                loadEjercicio(currentTargetKey);
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
