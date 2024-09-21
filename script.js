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

    const tramos = [
        "Portales 1", "Portales 2", "Valdivia 1", "Valdivia 2", "Rodríguez 1", "Rodríguez 2", 
        "Matta 1", "Matta 2", "Freire 1", "Freire 2", "Pratt 1", 
        "Bernardo O'Higgins 1", "Bernardo O'Higgins 2", "Martínez de Rosas 1", 
        "Martínez de Rosas 2", "José Miguel Carrera 1", "José Miguel Carrera 2", 
        "José Miguel Carrera 3"
    ];

    // Tramos preferidos para los operarios con mayor recaudación
    const tramosFrecuenciaAlta = [
        { operario: "CARLOS RAFAEL ESCAREZ BARRA", tramo: "Carrera 1 - Portales 1" },
        { operario: "JOSE ANTONIO POYENCURA LLANCAPAN CATRICURA", tramo: "O'higgins 3 - Rodríguez 1" },
        { operario: "MARIE CARMELLE SIMILIEN", tramo: "O'higgins 5 - Pratt 1" },
        { operario: "RAFAEL ANTONIO ÁLVAREZ PUENTE", tramo: "O'higgins 4 - Matta 2" }
    ];

    let resultados = '';
    const operariosSinAsignar = [];
    const tramosAsignados = new Set(); // Conjunto para evitar tramos duplicados

    // Función para determinar si un operario recibe su tramo preferido (70% de probabilidad)
    function tieneAltaProbabilidad() {
        return Math.random() < 0.7; // 70% de probabilidad
    }

    operarios.forEach((operario) => {
        let tramo = null;
        // Comprobar si el operario tiene un tramo con alta prioridad
        const tramoPreferido = tramosFrecuenciaAlta.find(t => t.operario === operario);
        
        // Si tiene un tramo preferido y se cumple la probabilidad, se le asigna ese tramo
        if (tramoPreferido && tieneAltaProbabilidad() && !tramosAsignados.has(tramoPreferido.tramo)) {
            tramo = tramoPreferido.tramo;
            tramosAsignados.add(tramo); // Agregar el tramo al conjunto de asignados
        } else {
            // Asignar uno al azar, siempre que no esté ya asignado
            let tramosDisponibles = tramos.filter(t => !tramosAsignados.has(t)); // Filtrar los tramos ya asignados
            tramo = tramosDisponibles.length > 0 ? tramosDisponibles.splice(Math.floor(Math.random() * tramosDisponibles.length), 1)[0] : null;
            if (tramo) tramosAsignados.add(tramo); // Agregar al conjunto de asignados
        }

        if (tramo) {
            resultados += `
                <tr>
                    <td>${operario}</td>
                    <td>${tramo}</td>
                </tr>
            `;
        } else {
            // Si no hay tramos disponibles, agregar el operario a la lista de no asignados
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