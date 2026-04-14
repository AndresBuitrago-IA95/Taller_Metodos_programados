const ejerciciosData = {
    portada: {
        title: "Taller de Métodos Numéricos Programados",
        content: `
            <div class="math-block" style="text-align: center; border: none; background: transparent;">
                <h2 style="font-size: 2rem; color: #fff;">Integrantes del Grupo</h2>
                <br>
                <h3 style="color: var(--accent-color); font-size: 1.5rem;">Lisbeth Catano Sepulveda</h3>
                <h3 style="color: var(--accent-color); font-size: 1.5rem;">Juan Carlos Santa Hurtado</h3>
                <h3 style="color: var(--accent-color); font-size: 1.5rem;">Andres Ferney Buitrago Suárez</h3>
            </div>
            <div class="math-block">
                <h3>Métodos Estudiados e Implementados:</h3>
                <ul>
                    <li><strong>Mínimo / Máximo:</strong> Sección/Razón dorada, Interpolación cuadrática, Newton, Búsqueda aleatoria (solo para f en 3D).</li>
                    <li><strong>Raíces:</strong> Bisección, Falsa posición, Newton-Raphson.</li>
                </ul>
            </div>
            <div class="highlight-box">
                Selecciona un ejercicio del panel lateral para ver su formulación matemática, resultados obtenidos, conclusiones y su respectiva gráfica interactiva.
            </div>
        `,
        renderPlot: (divId) => {
            const layout = {
                title: 'Bienvenido',
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                font: { color: '#94a3b8' },
                xaxis: { showgrid: false, zeroline: false, showticklabels: false },
                yaxis: { showgrid: false, zeroline: false, showticklabels: false }
            };
            Plotly.newPlot(divId, [{
                x: [1, 2, 3, 4],
                y: [10, 15, 13, 17],
                mode: 'lines+markers',
                line: { shape: 'spline', color: '#0ea5e9', width: 4 }
            }], layout, {staticPlot: true});
        }
    },
    ejercicio1: {
        title: "1. Puntos Críticos (Multiplicadores de Lagrange)",
        content: `
            <p>Teniendo en cuenta la siguiente función iterativa y restricción:</p>
            <div class="math-block">
                $$f(x, y) = 4x + 3y$$
                <p>Sujeto a la restricción elíptica:</p>
                $$g(x, y) = 2x^2 + 4y^2 - x + 4y = 0$$
            </div>
            <h3>Procedimiento Analítico</h3>
            <p>En un punto crítico de $f$ sujeto a $g = 0$, los gradientes son paralelos: $\\nabla f(x, y) = \\lambda \\cdot \\nabla g(x, y)$.</p>
            <ul>
                <li>$\\frac{\\partial f}{\\partial x} = \\lambda \\cdot \\frac{\\partial g}{\\partial x} \\implies 4 = \\lambda(4x - 1)$</li>
                <li>$\\frac{\\partial f}{\\partial y} = \\lambda \\cdot \\frac{\\partial g}{\\partial y} \\implies 3 = \\lambda(8y + 4)$</li>
            </ul>
            <p>Igualando $\\lambda$ y resolviendo la ecuación cuadrática $1312y^2 + 1312y + 247 = 0$:</p>
            <div class="math-block">
                $$y_1 \\approx -0.2515, \\quad x_1 \\approx 0.9126$$
                $$y_2 \\approx -0.7485, \\quad x_2 \\approx -0.4126$$
            </div>
            <div class="highlight-box">
                <strong>Conclusión:</strong> Encontramos dos puntos críticos sobre la elipse:<br>
                • <strong>Máximo:</strong> $P_1 = (0.9126, -0.2515)$ con $f_{max} = 2.8958$<br>
                • <strong>Mínimo:</strong> $P_2 = (-0.4126, -0.7485)$ con $f_{min} = -3.8958$
            </div>
        `,
        renderPlot: (divId) => {
            // Contour plot to show ellipse and f(x,y)
            let x = [], y = [], zG = [], zF = [];
            for (let i = -2; i <= 2; i += 0.05) {
                x.push(i);
                y.push(i);
            }
            for (let i = 0; i < y.length; i++) {
                let rowG = [], rowF = [];
                for (let j = 0; j < x.length; j++) {
                    const xx = x[j], yy = y[i];
                    rowG.push(2 * xx * xx + 4 * yy * yy - xx + 4 * yy);
                    rowF.push(4 * xx + 3 * yy);
                }
                zG.push(rowG);
                zF.push(rowF);
            }

            const ellipse = {
                z: zG, x: x, y: y,
                type: 'contour',
                contours: {start: 0, end: 0, size: 0.1, coloring: 'lines'},
                line: {color: '#ef4444', width: 3},
                name: 'g(x,y)=0 (Restricción)'
            };
            const func = {
                z: zF, x: x, y: y,
                type: 'contour',
                contours: {coloring: 'heatmap'},
                colorscale: 'Blues',
                name: 'f(x,y)'
            };
            const pts = {
                x: [0.9126, -0.4126], y: [-0.2515, -0.7485],
                mode: 'markers+text',
                type: 'scatter',
                name: 'Puntos Críticos',
                text: ['Máx', 'Mín'],
                textposition: 'top right',
                marker: {size: 10, color: '#10b981'}
            };

            const layout = {
                title: 'Contornos de f(x,y) y elipse g(x,y)=0',
                paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: {color: '#f1f5f9'},
                xaxis: {gridcolor: '#1e293b'}, yaxis: {gridcolor: '#1e293b'}
            };
            Plotly.newPlot(divId, [func, ellipse, pts], layout);
        }
    },
    ejercicio2: {
        title: "2. Búsqueda de Raíces",
        content: `
            <p>Para la función iterativa:</p>
            <div class="math-block">
                $$f(x) = x^{10} - 3x^4$$
            </div>
            
            <h3>Comparación de Métodos de Raíces</h3>
            <table>
                <tr>
                    <th>Método</th>
                    <th>Intervalo / $x_0$</th>
                    <th>Raíz hallada</th>
                    <th>Iteraciones</th>
                    <th>Error</th>
                </tr>
                <tr>
                    <td>Bisección (+)</td>
                    <td>[1.0, 1.5]</td>
                    <td>1.20093695</td>
                    <td>26</td>
                    <td>$7.45 \\times 10^{-9}$</td>
                </tr>
                <tr>
                    <td>Bisección (-)</td>
                    <td>[-1.5, -1.0]</td>
                    <td>-1.20093695</td>
                    <td>26</td>
                    <td>$7.45 \\times 10^{-9}$</td>
                </tr>
                <tr>
                    <td>Falsa Posición (+)</td>
                    <td>[1.0, 1.5]</td>
                    <td>1.20093692</td>
                    <td>67</td>
                    <td>$8.78 \\times 10^{-9}$</td>
                </tr>
                <tr>
                    <td>Newton-Raphson</td>
                    <td>$x_0 = 0.8$</td>
                    <td>$\approx 0$ (lenta conv.)</td>
                    <td>42</td>
                    <td>$1.41 \\times 10^{-6}$</td>
                </tr>
            </table>

            <div class="highlight-box">
                <strong>Conclusiones:</strong><br>
                • La <strong>bisección</strong> superó a la falsa posición (26 frente a 67 iteraciones) debido a la asimetría de la función en el intervalo.<br>
                • <strong>Newton-Raphson</strong> con $x_0 = 0.8$ sufre de convergencia lineal y es muy sensible al punto inicial para encontrar la raíz simple.
            </div>
        `,
        renderPlot: (divId) => {
            let x = [], y = [];
            for (let i = -1.6; i <= 1.6; i += 0.01) {
                x.push(i);
                y.push(Math.pow(i, 10) - 3 * Math.pow(i, 4));
            }
            const trace1 = { x: x, y: y, mode: 'lines', line: {color: '#0ea5e9', width: 2}, name: 'f(x)' };
            const roots = {
                x: [-1.2009, 0, 1.2009], y: [0, 0, 0],
                mode: 'markers', marker: {color: '#ef4444', size: 10}, name: 'Raíces'
            };
            const layout = {
                title: 'Gráfico de f(x) = x^10 - 3x^4',
                paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: {color: '#f1f5f9'},
                xaxis: {gridcolor: '#1e293b', zerolinecolor: '#ef4444'}, yaxis: {gridcolor: '#1e293b', range: [-5, 5]}
            };
            Plotly.newPlot(divId, [trace1, roots], layout);
        }
    },
    ejercicio3: {
        title: "3. Optimización con todos los métodos (Función Propia)",
        content: `
            <p>La función seleccionada para el análisis de optimización es:</p>
            <div class="math-block">
                $$f(x) = x^3 \\cdot e^{-x^2/2} \\cdot \\sin(x) + \\frac{x^2}{4}$$
            </div>
            
            <h3>Resultados de los Puntos Críticos</h3>
            <table>
                <tr>
                    <th>Método</th>
                    <th>Extremo</th>
                    <th>Punto Inicial ($x_0$ / Intervalo)</th>
                    <th>$x^*$ (Óptimo)</th>
                    <th>$f(x^*)$</th>
                    <th>Iteraciones</th>
                </tr>
                <tr>
                    <td>Sección Dorada</td>
                    <td>Máximo</td>
                    <td>[1.5, 2.5]</td>
                    <td>2.04212007</td>
                    <td>1.98564</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>Sección Dorada</td>
                    <td>Mínimo</td>
                    <td>[2.1, 3.0]</td>
                    <td>2.37794066</td>
                    <td>1.96389</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>Interp. Cuadrática</td>
                    <td>Máximo</td>
                    <td>{1.6, 2.0, 2.4}</td>
                    <td>2.04212210</td>
                    <td>1.98564</td>
                    <td>9</td>
                </tr>
                <tr>
                    <td>Newton-Raphson</td>
                    <td>Máximo</td>
                    <td>$x_0 = 1.8$</td>
                    <td>2.04212027</td>
                    <td>-</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Newton-Raphson</td>
                    <td>Mínimo</td>
                    <td>$x_0 = 2.8$</td>
                    <td>2.37794066</td>
                    <td>-</td>
                    <td>5</td>
                </tr>
            </table>

            <div class="highlight-box">
                Los datos muestran que Newton-Raphson es el método más veloz (5 iteraciones) al requerir la primera y segunda derivada, mientras la Sección Dorada requiere más evaluaciones por ser método de reducción de intervalos.
            </div>
        `,
        renderPlot: (divId) => {
            let x = [], y = [];
            for (let i = 0; i <= 5; i += 0.05) {
                x.push(i);
                // x^3 * exp(-x^2/2) * sin(x) + x^2/4
                y.push( Math.pow(i,3) * Math.exp(-Math.pow(i,2)/2) * Math.sin(i) + Math.pow(i,2)/4 );
            }
            const trace1 = { x: x, y: y, mode: 'lines', line: {color: '#10b981', width: 2}, name: 'f(x)' };
            const pts = {
                x: [2.0421, 2.3779],
                y: [1.9856, 1.9638],
                mode: 'markers+text',
                text: ['Máximo', 'Mínimo'], textposition: 'top center',
                marker: {color: '#f59e0b', size: 10}, name: 'Óptimos'
            };
            const layout = {
                title: 'Óptimos Locales en f(x)',
                paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: {color: '#f1f5f9'},
                xaxis: {gridcolor: '#1e293b'}, yaxis: {gridcolor: '#1e293b'}
            };
            Plotly.newPlot(divId, [trace1, pts], layout);
        }
    },
    ejercicio4: {
        title: "4. Estudio de Función Polinómica",
        content: `
            <p>Se evalúa el polinomio:</p>
            <div class="math-block">
                $$f(x) = -1.5x^3 - 2x^2 + 12x - 3$$
            </div>
            
            <h3>Optimización (Min/Max)</h3>
            <ul>
                <li><strong>Razón Dorada:</strong> Falla evidenciado por la gráfica (Mínimo fuera del intervalo). El Máximo arrojado en 12 iteraciones es $5.9453$.</li>
                <li><strong>Interpolación cuadrática ($x_0=-5, x_1=1, x_2=5$):</strong> Mínimo: $-23.1388$ (10 iter.), Máximo: $5.9453$ (13 iter.).</li>
                <li><strong>Newton ($x_0=-2, x_0=0$):</strong> Logra los óptimos mucho más rápido (3 y 5 iteraciones respectivamente).</li>
            </ul>

            <h3>Búsqueda de Raíces</h3>
            <p><strong>Bisección:</strong> Raíz 1 ($[0,4]$): $0.2646$. Raíz 2 ($[-4,0]$): $-3.6650$. (12 iter.)<br>
            <strong>Falsa Posición:</strong> Requiere verificar que el intervalo inicial encierre una sola raíz. Newton converge en 3 iteraciones.</p>
        `,
        renderPlot: (divId) => {
            let x = [], y = [];
            for (let i = -5; i <= 3; i += 0.1) {
                x.push(i);
                y.push(-1.5*Math.pow(i,3) - 2*Math.pow(i,2) + 12*i - 3);
            }
            const trace1 = { x: x, y: y, mode: 'lines', line: {color: '#8b5cf6', width: 2}, name: 'f(x)' };
            
            // Critical roots & points
            const crit = {
                x: [-3.665, 0.2639, -Infinity, Infinity], // simplified points roughly
                y: [0, 0, -23.1388, 5.9453],
                mode: 'markers', marker: {color: '#fbbf24', size: 8}, name: 'Puntos Clave'
            };
            
            const layout = {
                title: 'Polinomio de grado 3',
                paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: {color: '#f1f5f9'},
                xaxis: {gridcolor: '#1e293b', zerolinecolor: '#ef4444'}, yaxis: {gridcolor: '#1e293b'}
            };
            Plotly.newPlot(divId, [trace1, crit], layout);
        }
    },
    ejercicio5: {
        title: "5. Función Trigonométrica",
        content: `
            <p>Evaluación de raíces y óptimos para:</p>
            <div class="math-block">
                $$f(x) = 2\\sin(x) - \\frac{x}{4}$$
            </div>
            
            <h3>Búsqueda de Raíz cerca del origen ($x=0$)</h3>
            <ul>
                <li><strong>Newton-Raphson ($x_0=1.0$):</strong> Alcanza la raíz $x=0$ en 5 iteraciones.</li>
                <li><strong>Bisección ($[-1, 1]$):</strong> Encuentra la raíz en 0 iteraciones (caso ideal absoluto, dado que el centro cae directamente ahí).</li>
                <li><strong>Falsa Posición ($[-1, 1]$):</strong> Error residual de $2.1571 \\times 10^{-12}$ en 5 iteraciones.</li>
            </ul>

            <h3>Óptimos Locales</h3>
            <p>Usando Razón Dorada, Interpolación Cuadrática y Newton:<br>
            Se halla un <strong>mínimo en $-1.6229$</strong> y un <strong>máximo en $1.6229$</strong>. Newton es consistentemente el método más eficiente (3 iteraciones), seguido por Interpolación Cuadrática (5 iteraciones).</p>
        `,
        renderPlot: (divId) => {
            let x = [], y = [];
            for (let i = -5; i <= 5; i += 0.1) {
                x.push(i);
                y.push(2*Math.sin(i) - i/4);
            }
            const trace1 = { x: x, y: y, mode: 'lines', line: {color: '#ec4899', width: 2}, name: 'f(x)' };
            const layout = {
                title: 'Gráfico: 2sen(x) - x/4',
                paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: {color: '#f1f5f9'},
                xaxis: {gridcolor: '#1e293b', zerolinecolor: '#ef4444'}, yaxis: {gridcolor: '#1e293b'}
            };
            Plotly.newPlot(divId, [trace1], layout);
        }
    },
    ejercicio6: {
        title: "6. Fallas en Funciones no Convexas",
        content: `
            <p>Análisis especial con función hiperbólica:</p>
            <div class="math-block">
                $$f(x) = \\tanh(x^2 - 7)$$
            </div>
            
            <div class="warning-box">
                <strong>Newton-Raphson falla con $x_0 = 3.2$:</strong><br>
                Debido a la saturación de $\\tanh()$, la derivada de la función se acerca asintóticamente a cero, lo cual indefine o dispara la iteración de Newton.
            </div>

            <h3>Resultados de Raíces</h3>
            <p>Bisección: $2.6456$ y $-2.6463$ en 12 iter. <br>
            Falsa Posición: $2.6457$ y $-2.6457$ en 10 iter.</p>

            <h3>Óptimos (Función no Convexa)</h3>
            <p>El máximo global teórico tiende a $1$ a medida que $|x|$ aumenta. La Interpolación Cuadrática llega a conclusiones erróneas buscando "el máximo que da un mínimo" porque la función en la zona local analizada no es ni convexa ni cóncava puramente (tiene valles y cumbres llanas).</p>
        `,
        renderPlot: (divId) => {
            let x = [], y = [];
            for (let i = -5; i <= 5; i += 0.05) {
                x.push(i);
                y.push(Math.tanh(i*i - 7));
            }
            const trace1 = { x: x, y: y, mode: 'lines', line: {color: '#14b8a6', width: 2}, name: 'f(x)' };
            const layout = {
                title: 'Saturación en tanh(x^2 - 7)',
                paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: {color: '#f1f5f9'},
                xaxis: {gridcolor: '#1e293b', zerolinecolor: '#ef4444'}, yaxis: {gridcolor: '#1e293b'}
            };
            Plotly.newPlot(divId, [trace1], layout);
        }
    },
    ejercicio7: {
        title: "7. Polinomio (Sensibilidad al Error)",
        content: `
            <p>Evaluando la optimización con restricciones de precisión:</p>
            <div class="math-block">
                $$f(x) = 4x^4 + 3x^3 + 5x^2 + 6x + 3$$
            </div>
            
            <h3>Buscando el Mínimo Global</h3>
            <ul>
                <li><strong>Razón Dorada ($[-2, 1]$):</strong> Mínimo: $-0.5849$ (16 iter, error < 0.01).</li>
                <li><strong>Interpolación Cuadrática:</strong> $x = -0.5841$ (6 iteraciones). Eficiente en perfiles parabólicos.</li>
                <li><strong>Newton ($x_0 = -1$):</strong> $x = -0.5841$ (4 iteraciones). Rápido porque f''(x) > 0 siempre.</li>
            </ul>

            <div class="highlight-box">
                <strong>Severidad del error ($e = 0.0001$):</strong><br>
                Al aumentar la severidad del error, <strong>Bisección</strong> escala linealmente (suma 7 iteraciones). <strong>Newton-Raphson</strong>, gracias a su convergencia cuadrática, asimila el aumento de restricción en solo 1 o 2 iteraciones adicionales.
            </div>
        `,
        renderPlot: (divId) => {
            let x = [], y = [];
            for (let i = -2; i <= 1.5; i += 0.05) {
                x.push(i);
                y.push(4*Math.pow(i,4) + 3*Math.pow(i,3) + 5*Math.pow(i,2) + 6*i + 3);
            }
            const trace1 = { x: x, y: y, mode: 'lines', line: {color: '#0ea5e9', width: 2}, name: 'f(x)' };
            const layout = {
                title: 'Perfil convexo f\'\'(x) > 0',
                paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: {color: '#f1f5f9'},
                xaxis: {gridcolor: '#1e293b'}, yaxis: {gridcolor: '#1e293b'}
            };
            Plotly.newPlot(divId, [trace1], layout);
        }
    },
    ejercicio8: {
        title: "8. Exponencial Estrictamente Creciente",
        content: `
            <p>Dada la función exponencial:</p>
            <div class="math-block">
                $$f(x) = 3e^x - \\frac{7}{3}$$
            </div>
            
            <div class="warning-box">
                <strong>Anomalía Crítica:</strong><br>
                Esta función <strong>no posee mínimos locales reales</strong> ya que su derivada $3e^x > 0$ en todo el dominio $\\mathbb{R}$.
            </div>

            <ul>
                <li><strong>Razón Dorada ($[-5, 5]$):</strong> Falsa convergencia a $-4.9999$ (se asienta en el extremo límite del intervalo provisto).</li>
                <li><strong>Interpolación Cuadrática ($x_0=0, x_1=1, x_2=2$):</strong> Diverge al intentar ajustar una parábola a un perfil puramente creciente.</li>
                <li><strong>Newton ($x_0=1$):</strong> Resulta en una traslación hacia $-\\infty$. Analíticamente $x_{i+1} = x_i - \\frac{3e^x}{3e^x} = x_i - 1$, por ende diverge eternamente reduciendo en 1 el punto.</li>
            </ul>
        `,
        renderPlot: (divId) => {
            let x = [], y = [];
            for (let i = -3; i <= 3; i += 0.1) {
                x.push(i);
                y.push(3*Math.exp(i) - 7/3);
            }
            const trace1 = { x: x, y: y, mode: 'lines', line: {color: '#f43f5e', width: 2}, name: 'f(x)' };
            const layout = {
                title: 'Rampa Exponencial Infinita',
                paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: {color: '#f1f5f9'},
                xaxis: {gridcolor: '#1e293b'}, yaxis: {gridcolor: '#1e293b'}
            };
            Plotly.newPlot(divId, [trace1], layout);
        }
    },
    ejercicio9: {
        title: "9. Búsqueda Aleatoria 3D y Máxima Inclinación",
        content: `
            <p>Optimización multivariable para:</p>
            <div class="math-block">
                $$f(x,y) = 4x + 2y + x^2 - 2x^4 + 2xy - 3y^2$$
            </div>
            
            <h3>Búsqueda Aleatoria ($[-2, 2]$)</h3>
            <p>Iterando muestras aleatoriamente sobre el plano xy se obtiene un máximo estimado en $6.1821$ (Coordenadas próximas a $x \\approx 0.81, y \\approx 0.60$). Esto requiere miles de iteraciones.</p>

            <h3>Gradiente Ascendente (Máxima Inclinación)</h3>
            <div class="highlight-box">
                Sí, el método de Gradiente Ascendente es técnicamente superior. Al ser un polinomio continuo, el vector $\\nabla f$ permite ascender eficientemente guiando al algoritmo iterativo, ahorrando miles de evaluaciones funcionales y reduciendo dramáticamente el uso de computo frente al aleatorio puro.
            </div>
        `,
        renderPlot: (divId) => {
            let z = [], x = [], y = [];
            for (let i = -2; i <= 2; i += 0.1) {
                x.push(i); y.push(i);
            }
            for (let i = 0; i < y.length; i++) {
                let row = [];
                for (let j = 0; j < x.length; j++) {
                    const xx = x[j], yy = y[i];
                    row.push(4*xx + 2*yy + xx*xx - 2*Math.pow(xx,4) + 2*xx*yy - 3*yy*yy);
                }
                z.push(row);
            }

            const trace = {
                z: z, x: x, y: y,
                type: 'surface',
                colorscale: 'Viridis'
            };
            const layout = {
                title: 'Superficie 3D: Gradiente',
                scene: {
                    xaxis: {title: 'X'}, yaxis: {title: 'Y'}, zaxis: {title: 'Z'}
                },
                paper_bgcolor: 'rgba(0,0,0,0)', font: {color: '#f1f5f9'}, autosize: true
            };
            Plotly.newPlot(divId, [trace], layout);
        }
    }
};
