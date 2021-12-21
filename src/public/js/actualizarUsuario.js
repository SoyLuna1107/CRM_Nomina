document.addEventListener("DOMContentLoaded", (e) => {
  const id = document.getElementById("idUsuario").textContent;
  console.log(id);

  postData("/nomina/getUsuarioID", { id }).then((res) => {
    console.log(res);

    function showSelectOnForm(options, select, dato) {
      options.forEach((elemOption) => {
        if (elemOption.value === dato) {
          elemOption.setAttribute("selected", "true");
        }
      });
      M.FormSelect.init(select);
    }
    // select MODALIDADES
    const modOptions = document.querySelectorAll("#modalidad option"),
      selectMod = document.getElementById("modalidad");
    showSelectOnForm(modOptions, selectMod, res.CON_CDETALLE);

    // select campañas
    const camOptions = document.querySelectorAll("#campaña option"),
      selectCamp = document.getElementById("campaña");
    showSelectOnForm(camOptions, selectCamp, res.CON_CDETALLE2);
    console.log(selectCamp);

    //select cargo (falta cargar listado desde DB)
    // const cargoOptions = document.querySelectorAll("#cargo option"),
    // selectCargo = document.getElementById("cargo");
    // showSelectOnForm(cargoOptions, selectCargo,res.CON_CDETALLE4);

    //select JEFE INMEDIATO
    const jefeInmOptions = document.querySelectorAll("#jefe_inm option"),
      selectJefeInm = document.getElementById("jefe_inm");
    showSelectOnForm(jefeInmOptions, selectJefeInm, res.CON_CDETALLE12);

    //select JEFE OPERACION
    const jefeOpeOptions = document.querySelectorAll("#jefe_ope option"),
      selectJefeOpe = document.getElementById("jefe_ope");
    showSelectOnForm(jefeOpeOptions, selectJefeOpe, res.CON_CDETALLE13);

    //select GRUPO SANGUINEO
    const grupoSanOptions = document.querySelectorAll("#Grupo_sanguineo option"),
      selectGrupoSan = document.getElementById("Grupo_sanguineo");
    showSelectOnForm(grupoSanOptions, selectGrupoSan, res.CON_CDETALLE19);

    //select ESTADO CIVIL
    const estadoCivilOptions = document.querySelectorAll("#estado_civil option"),
      selectEstadoCivil = document.getElementById("estado_civil");
    showSelectOnForm(estadoCivilOptions, selectEstadoCivil, res.CON_CDETALLE21);

    //select CAUSA DE RETIRO
    const causaRetiroOptions = document.querySelectorAll("#causa-retiro option"),
      selectcausaRetiro = document.getElementById("causa-retiro");
    showSelectOnForm(causaRetiroOptions, selectcausaRetiro, res.CON_CDETALLE34);

    //select CAUSA DE RETIRO
    const vacunadoOptions = document.querySelectorAll("#vacunado option"),
      selectvacunado = document.getElementById("vacunado");
    showSelectOnForm(vacunadoOptions, selectvacunado, res.CON_CDETALLE45);
  });
});
