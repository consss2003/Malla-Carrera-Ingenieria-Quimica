fetch('datos.json').then(r=>r.json()).then(data=>{
  const cont = document.getElementById('malla');
  data.materias.forEach(mat=>{
    const div = document.createElement('div');
    div.className = 'materia ' + mat.estado;
    div.innerText = mat.codigo + '\\n' + mat.nombre;
    div.onclick = () => {
      if(mat.estado !== 'aprobada') {
        mat.estado = mat.estado === 'cursando' ? 'aprobada' : 'cursando';
        div.className = 'materia ' + mat.estado;
        actualizar();
      }
    };
    cont.appendChild(div);
  });
  function actualizar(){
    // lógica para desbloquear correlativas
    data.materias.forEach(mat=> {
      if(mat.estado === 'pendiente') {
        const done = mat.correlativas.every(cod =>
          data.materias.find(m=>m.codigo===cod)?.estado==='aprobada');
        if(done) mat.estado='cursando';
      }
    });
    cont.innerHTML=''; data.materias.forEach(mat=>{/* redraw */}
      const div = document.createElement('div');
      div.className = 'materia ' + mat.estado;
      div.innerText = mat.codigo + '\\n' + mat.nombre;
      div.onclick = () => {
        if(mat.estado !== 'aprobada') {
          mat.estado = mat.estado === 'cursando' ? 'aprobada' : 'cursando';
          actualizar();
        }
      };
      cont.appendChild(div);
    });
  }
});
