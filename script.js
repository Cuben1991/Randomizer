function asignarOperarios() {
    const operarios = [
        "CARLOS RAFAEL ESCAREZ BARRA", "JOSE ANTONIO POYENCURA LLANCAPAN CATRICURA", 
        "MARIE CARMELLE SIMILIEN", "RAFAEL ANTONIO ÁLVAREZ PUENTE", 
        "JONATHAN ANDRÉS LLEUFUMAN MORAGA", "BERNARDA AURELIA TRECAÑANCO TRECAÑANCO", 
        "JAIME ALBERTO REYES GUTIÉRREZ", "LUIS EDUARDO AGUAYO AILLAPAN", 
        "FERNANDO ANTONIO CONCHA MILLALEO", "CAMILO ANTONIO CARRASCO RAMIREZ", 
        "ALEXANDER ADRIÁN MENDOZA TRECAÑANCO", "IVET ROSSMERY RIOS ANCAMILLA", 
        "ARTURO BENJAMIN TIZNADO SANHUEZA", "MIDARWIN DAVID SOLANTE CHOURIO", 
        "YOSELIN ALEJANDRA ASCENCIO LEFICOY", "FRANCO DANTE CARRASCO ROA", 
        "AMERICA PAZ VIDAL DIAZ", "YAMILET SOLEDAD MORA COFRÉ", 
        "ROXANA ALEJANDRA PÉREZ GALDAMEZ", "EVELYN DEL PILAR TRECAÑANCO CHEUQUEPAN", 
        "NELSON DAVID MUÑOZ REYES"
    ];

    const tramos = {
        // Agrupaciones en forma de T o L para tramos cercanos
        "O'Higgins": ["O'Higgins 1", "O'Higgins 2", "O'Higgins 3"],
        "Rodríguez": ["Rodríguez 1", "Rodríguez 2"],
        "Matta": ["Matta 1", "Matta 2"],
        "Valdivia": ["Valdivia 1", "Valdivia 2"],
        "Pratt": ["Pratt 1", "Pratt 2"],
        "Carrera": ["Carrera 1", "Carrera 2", "Carrera 3"],
        "Portales": ["Portales 1", "Portales 2"],
        "Freire": ["Freire 1", "Freire 2"]
    };

    const tramosFrecuenciaAlta = [
        { operario: "CARLOS RAFAEL ESCAREZ BARRA", tramo: "O'Higgins 1" },
        { operario: "JOSE ANTONIO POYENCURA LLANCAPAN CATRICURA", tramo: "Rodríguez 1" },
        { operario: "MARIE CARMELLE SIMILIEN", tramo: "Pratt 1" },
        { operario: "RAFAEL ANTONIO ÁLVAREZ PUENTE", tramo: "Matta 2" }
    ];

    let resultados = '';
    const operariosSinAsignar = [];
    const tramosAsignados = new Set();

    // Función para determinar si un operario recibe su tramo preferido (70% de probabilidad)
    function tieneAltaProbabilidad() {
        return Math.random() < 0.7; // 70% de probabilidad
    }

    operarios.forEach((operario) => {
        let tramo = null;
        // Comprobar si el operario tiene un tramo preferido
        const tramoPreferido = tramosFrecuenciaAlta.find(t => t.operario === operario);

        // Si tiene un tramo preferido y la probabilidad lo permite, se le asigna
        if (tramoPreferido && tieneAltaProbabilidad() && !tramosAsignados.has(tramoPreferido.tramo)) {
            tramo = tramoPreferido.tramo;
            tramosAsignados.add(tramo);
        } else {
            // Agrupación lógica de tramos por proximidad (por ejemplo, en forma de "T" o "L")
            const gruposTramos = Object.values(tramos).flat().filter(t => !tramosAsignados.has(t));
            if (gruposTramos.length > 0) {
                tramo = gruposTramos.splice(Math.floor(Math.random() * gruposTramos.length), 1)[0];
                tramosAsignados.add(tramo);
            }
        }

        if (tramo) {
            resultados += `
                <tr>
                    <td>${operario}</td>
                    <td>${tramo}</td>
                </tr>
            `;
        } else {
            operariosSinAsignar.push(operario);
        }
    });

    // Mostrar operarios sin tramo asignado
    if (operariosSinAsignar.length > 0) {
        resultados += `<tr><td colspan="2"><strong>Operarios sin asignar:</strong></td></tr>`;
        operariosSinAsignar.forEach(operario => {
            resultados += `
                <tr>
                    <td>${operario}</td>
                    <td>Sin tramo asignado</td>
                </tr>
            `;
        });
    }

    document.getElementById('tabla-resultados').innerHTML = resultados;
}

function exportarPDF() {
    const element = document.querySelector('.resultados');
    html2pdf().from(element).save('asignacion-operarios.pdf');
}
