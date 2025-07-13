const data = {
  cuatrimestres: [
    {
      nombre: "1er Cuatrimestre",
      materias: [
        { codigo: "IQ101", nombre: "Informática General", estado: "pendiente", correlativas: [] },
        { codigo: "IQ102", nombre: "Álgebra Lineal", estado: "pendiente", correlativas: [] },
        { codigo: "IQ103", nombre: "Química General", estado: "pendiente", correlativas: [] },
        { codigo: "IQ104", nombre: "Análisis Matemático I", estado: "pendiente", correlativas: [] },
        { codigo: "IQ105", nombre: "Tecnología y Sociedad", estado: "pendiente", correlativas: [] }
      ]
    },
    {
      nombre: "2do Cuatrimestre",
      materias: [
        { codigo: "IQ106", nombre: "Introducción a la Ing. Química", estado: "pendiente", correlativas: [] },
        { codigo: "IQ107", nombre: "Física I", estado: "pendiente", correlativas: ["IQ104"] },
        { codigo: "IQ108", nombre: "Química Inorgánica", estado: "pendiente", correlativas: ["IQ103"] },
        { codigo: "IQ109", nombre: "Análisis Matemático II", estado: "pendiente", correlativas: ["IQ104"] },
        { codigo: "IQ110", nombre: "Sistemas de Representación", estado: "pendiente", correlativas: [] }
      ]
    },
    // Agregar aquí el resto de los cuatrimestres como en la imagen azul
    {
      nombre: "Electivas",
      materias: [
        { codigo: "OPT1", nombre: "Electiva 1", estado: "pendiente", correlativas: [], optativa: true },
        { codigo: "OPT2", nombre: "Electiva 2", estado: "pendiente", correlativas: [], optativa: true },
        { codigo: "OPT3", nombre: "Electiva 3", estado: "pendiente", correlativas: [], optativa: true }
      ]
    }
  ]
};

const cont = document.getElementById('malla');

function dibujar() {
  cont.innerHTML = '';
  data.cuatrimestres.forEach(cuat => {
    const columna = document.createElement('div');
    columna.className = 'cuatrimestre';
    const titulo = document.createElement('h2');
    titulo.innerText = cuat.nombre;
    columna.appendChild(titulo);

    cuat.materias.forEach(mat => {
      const div = document.createElement('div');
      div.className = 'materia ' + mat.estado + (mat.optativa ? ' optativa' : '');
      div.innerText = mat.codigo + '\n' + mat.nombre;
      div.onclick = () => {
        if (mat.estado !== 'aprobada') {
          mat.estado = mat.estado === 'cursando' ? 'aprobada' : 'cursando';
          actualizar();
        }
      };
      columna.appendChild(div);
    });

    cont.appendChild(columna);
  });
}

function actualizar() {
  data.cuatrimestres.forEach(cuat => {
    cuat.materias.forEach(mat => {
      if (mat.estado === 'pendiente') {
        const done = mat.correlativas.every(cod => {
          return data.cuatrimestres.some(c =>
            c.materias.find(m => m.codigo === cod && m.estado === 'aprobada')
          );
        });
        if (done) mat.estado = 'cursando';
      }
    });
  });
  dibujar();
}

dibujar();
