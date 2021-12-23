document.addEventListener('DOMContentLoaded', (e) => {
  const btnCargarExcel = document.getElementById('btnCargarExcel'),
    fileExcel = document.getElementById('fileExcel');
  btnCargarExcel.addEventListener(
    'click',
    (e) => {
      let mensajeError = '';
      if (!fileExcel.value) {
        mensajeError = 'Seleccione Excel';
      } else {
        let tipoArchivo = fileExcel.files[0].name.split('.')[1] || '';
        if (tipoArchivo !== 'xlsx') {
          mensajeError = `Tipo de archivo incorrecto, use <span style="color: #27ae60">.xlsx</span>`;
        }
      }
      if (mensajeError) {
        Toast.fire({
          icon: 'error',
          title: mensajeError,
        });
        e.preventDefault();
      }
    },
    false
  );
});
