document.addEventListener("DOMContentLoaded", (e) => {
    const id = document.getElementById("idCargo").textContent;
    console.log(id);
  
    postData("/nomina/getCragoID", { id }).then((res) => {
        console.log(res);

        function showSelectOnForm(options, select, dato) {
            options.forEach((elemOption) => {
              if (elemOption.value === dato) {
                elemOption.setAttribute("selected", "true");
              }
            });
            M.FormSelect.init(select);
          }
          // select AREA
          const modOptions = document.querySelectorAll("#cargo_area option"),
            selectMod = document.getElementById("cargo_area");
          showSelectOnForm(modOptions, selectMod, res.EST_CDETALLE1);

        //select TIPO
          const tipoOptions = document.querySelectorAll("#cargo_tipo option"),
            selectTipo = document.getElementById("cargo_tipo");
          showSelectOnForm(tipoOptions, selectTipo, res.EST_CDETALLE2);
    });
   
  });
  