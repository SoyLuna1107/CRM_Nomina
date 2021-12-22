document.addEventListener('DOMContentLoaded', (req, res) => {
  const idGerente = document.getElementById('idGerente').textContent;
  postData('/nomina/getAll', { idGerente }).then((res) => {
    const PER_CCAMPANA_Options = document.querySelectorAll('#PER_CCAMPANA option'),
      selectPER_CCAMPANA = document.getElementById('PER_CCAMPANA')
    PER_CCAMPANA_Options.forEach((elemOption) => {
      if (elemOption.value === res.dataUser.PER_CCAMPANA) {
        elemOption.setAttribute('selected', 'true');
      }
    });
    M.FormSelect.init(selectPER_CCAMPANA);
  });

  const btnActualizarGerente = document.getElementById('btnActualizarGerente');

  let CRE_CUSUARIO = document.getElementById('CRE_CUSUARIO'),
    CRE_CNOMBRE = document.getElementById('CRE_CNOMBRE'),
    CRE_CNOMBRE2 = document.getElementById('CRE_CNOMBRE2'),
    CRE_CAPELLIDO = document.getElementById('CRE_CAPELLIDO'),
    CRE_CAPELLIDO2 = document.getElementById('CRE_CAPELLIDO2'),
    CRE_CDOCUMENTO = document.getElementById('CRE_CDOCUMENTO'),
    PER_CCAMPANA = document.getElementById('PER_CCAMPANA');

  inputsMayus([CRE_CUSUARIO, CRE_CNOMBRE, CRE_CNOMBRE2, CRE_CAPELLIDO, CRE_CAPELLIDO2]);
  inputSoloNum([CRE_CDOCUMENTO]);

  btnActualizarGerente.addEventListener(
    'click',
    async (e) => {
      let errorMessage = '';

      // * Validar si Ingreso Primer Nombre
      if (!CRE_CNOMBRE.value) errorMessage = 'Por Favor Ingrese Primer Nombre';
      // * Validar si Ingreso Primer Apellido
      if (!CRE_CAPELLIDO.value) errorMessage = 'Por Favor Ingrese Primer Apellido';
      // * Validar si Ingreso Cedula
      if (!CRE_CDOCUMENTO.value) errorMessage = 'Por Favor Ingrese Cedula';
      // * Validar si Ingreso Campaña
      if (!PER_CCAMPANA.value) errorMessage = 'Por Favor Ingrese Campaña';

      if (errorMessage) {
        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });
        e.preventDefault()
      }
    },
    false
  );
});
