const data = {
  materias: [
    { codigo: "IQ101", nombre: "Química General", estado: "pendiente", correlativas: [] },
    { codigo: "IQ102", nombre: "Matemática I", estado: "pendiente", correlativas: [] },
    { codigo: "IQ103", nombre: "Física I", estado: "pendiente", correlativas: [] },
    { codigo: "IQ104", nombre: "Introducción a la Ingeniería Química", estado: "pendiente", correlativas: [] },

    { codigo: "IQ201", nombre: "Matemática II", estado: "pendiente", correlativas: ["IQ102"] },
    { codigo: "IQ202", nombre: "Física II", estado: "pendiente", correlativas: ["IQ103"] },
    { codigo: "IQ203", nombre: "Química Inorgánica", estado: "pendiente", correlativas: ["IQ101"] },
    { codigo: "IQ204", nombre: "Informática", estado: "pendiente", correlativas: [] },

    { codigo: "IQ301", nombre: "Química Orgánica", estado: "pendiente", correlativas: ["IQ101"] },
    { codigo: "IQ302", nombre: "Probabilidad y Estadística", estado: "pendiente", correlativas: ["IQ201"] },
    { codigo: "IQ303", nombre: "Fisicoquímica I", estado: "pendiente", correlativas: ["IQ203"] },
    { codigo: "IQ304", nombre: "Dibujo Técnico", estado: "pendiente", correlativas: [] },

    { codigo: "IQ401", nombre: "Fisicoquímica II", estado: "pendiente", correlativas: ["IQ303"] },
    { codigo: "IQ402", nombre: "Termodinámica de Procesos", estado: "pendiente", correlativas: ["IQ401"] },
    { codigo: "IQ403", nombre: "Fenómenos de Transporte I", estado: "pendiente", correlativas: ["IQ202", "IQ303"] },
    { codigo: "IQ404", nombre: "Análisis Matemático III", estado: "pendiente", correlativas: ["IQ201"] },

    { codigo: "IQ501", nombre: "Operaciones Unitarias I", estado: "pendiente", correlativas: ["IQ403"] },
    { codigo: "IQ502", nombre: "Ingeniería de las Reacciones Químicas", estado: "pendiente", correlativas: ["IQ301", "IQ303"] },
    { codigo: "IQ503", nombre: "Fenómenos de Transporte II", estado: "pendiente", correlativas: ["IQ403"] },
    { codigo: "IQ504", nombre: "Cálculo Numérico", estado: "pendiente", correlativas: ["IQ302", "IQ404"] },

    { codigo: "IQ601", nombre: "Instrumentación y Control", estado: "pendiente", correlativas: ["IQ501"] },
    { codigo: "IQ602", nombre: "Operaciones Unitarias II", estado: "pendiente", correlativas: ["IQ501", "IQ503"] },
    { codigo: "IQ603", nombre: "Procesos de Separación", estado: "pendiente", correlativas: ["IQ502", "IQ503"] },
    { codigo: "IQ604", nombre: "Modelado y Simulación", estado: "pendiente", correlativas: ["IQ504"] },

    { codigo: "IQ701", nombre: "Diseño de Plantas I", estado: "pendiente", correlativas: ["IQ602", "IQ603"] },
    { codigo: "IQ702", nombre: "Economía y Legislación", estado: "pendiente", correlativas: [] },
    { codigo: "IQ703", nombre: "Gestión Ambiental", estado: "pendiente", correlativas: [] },
    { codigo: "IQ704", nombre: "Electiva Técnica", estado: "optativa", correlativas: [] },

    { codigo: "IQ801", nombre: "Diseño de Plantas II", estado: "pendiente", correlativas: ["IQ701"] },
    { codigo: "IQ802", nombre: "Evaluación de Proyectos", estado: "pendiente", correlativas: ["IQ701", "IQ702"] },
    { codigo: "IQ803", nombre: "Trabajo Profesional", estado: "pendiente", correlativas: ["IQ801"] },
    { codigo: "IQ804", nombre: "Electiva Técnica II", estado: "optativa", correlativas: [] }

    // ACA VAN MÁS ELECTIVAS SI QUERÉS
  ]
};

const cont = document.getElementById('malla');
function dibujar() {
  cont.innerHTML = '';
  data.materias.forEach(mat => {
    const div = document.createElement('div');
    div.className = 'materia ' + mat.estado;
    div.innerText = mat.codigo + '\n' + mat.nombre;
    div.onclick = () => {
      if (mat.estado !== 'aprobada') {
        mat.estado = mat.estado === 'cursando' ? 'aprobada' : 'cursando';
        actualizar();
      }
    };
    cont.appendChild(div);
  });
}
function actualizar() {
  data.materias.forEach(mat => {
    if (mat.estado === 'pendiente') {
      const done = mat.correlativas.every(cod =>
        data.materias.find(m => m.codigo === cod)?.estado === 'aprobada'
      );
      if (done) mat.estado = 'cursando';
    }
  });
  dibujar();
}
dibujar();
