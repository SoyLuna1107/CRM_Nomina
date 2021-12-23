document.addEventListener('DOMContentLoaded', (req, res) => {
  const btnCrearGerente = document.getElementById('btnCrearGerente');

  let CRE_CUSUARIO = document.getElementById('CRE_CUSUARIO'),
    CRE_CNOMBRE = document.getElementById('CRE_CNOMBRE'),
    CRE_CNOMBRE2 = document.getElementById('CRE_CNOMBRE2'),
    CRE_CAPELLIDO = document.getElementById('CRE_CAPELLIDO'),
    CRE_CAPELLIDO2 = document.getElementById('CRE_CAPELLIDO2'),
    CRE_CDOCUMENTO = document.getElementById('CRE_CDOCUMENTO'),
    PER_CCAMPANA = document.getElementById('PER_CCAMPANA');

  inputsMayus([CRE_CUSUARIO, CRE_CNOMBRE, CRE_CNOMBRE2, CRE_CAPELLIDO, CRE_CAPELLIDO2]);
  inputSoloNum([CRE_CDOCUMENTO]);

  btnCrearGerente.addEventListener(
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

      // * Validar si el Gerente ta existe - Por CC

      let res = await postData('/nomina/gerenteCC', { CRE_CDOCUMENTO: CRE_CDOCUMENTO.value })
      let existeGerente = await res.length
      if (existeGerente) errorMessage = 'El usuario ya existe';

      if (errorMessage) {
        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });
      e.preventDefault();
      }
    },
    false
  );
});
