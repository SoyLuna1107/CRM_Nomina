const router = require("express").Router();
const db = require("../database");
const path = require("path");
const ExcelJS = require("exceljs");
const Moment = require("moment");
const Class2 = require("../Class2");
const { DeCrypt } = require("../public/js/Class2");
const { query } = require("../database");

let permiso = "";
let permiso1 = "ADMINISTRADOR";
let permiso2 = "GERENTE";
let permiso3 = "JEFE DE OPERACION";

var sqlTipoPermiso = "";
//FUNCION PARA ESTABLECER LA CONSULTA DE CARGOS DEPENDIENDO DEL PERMISO
function crearConsultaPermisosCaros(nivelPermiso) {
  if (nivelPermiso == permiso1) {
    sqlTipoPermiso = "SELECT EST_CDETALLE FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA ='cmbCargo'";
  } else if (nivelPermiso == permiso2) {
    sqlTipoPermiso = "SELECT EST_CDETALLE FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA ='cmbCargo' AND EST_CDETALLE3='GERENTE' OR EST_CDETALLE3='JEFE DE OPERACION' ORDER BY EST_CDETALLE ASC";
  } else if (nivelPermiso == permiso3) {
    sqlTipoPermiso = "SELECT EST_CDETALLE FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CCONSULTA ='cmbCargo' AND EST_CDETALLE3='JEFE DE OPERACION' ORDER BY EST_CDETALLE ASC";
  }

  return sqlTipoPermiso;
}

router.get("/crearPerfil/:username", (req, res) => {
  let username = req.params.username;
  const sqlUserPermiso = "SELECT * FROM dbp_nomina.TBL_RPERMISO WHERE FKPER_CUSUARIOS=?";
  db.promise()
    .query(sqlUserPermiso, [username])
    .then(([resultPermiso]) => {
      //cosultar cargos
      var consultaTipoPerCargo = "";
      consultaTipoPerCargo = crearConsultaPermisosCaros(resultPermiso[0].PER_CNIVEL);
      db.promise()
        .query(consultaTipoPerCargo)
        .then(([resultTipoPermiso]) => {
            //consultar campañas
          const sqlCampañas = "SELECT EST_CDETALLE FROM dbp_nomina.TBL_RESTANDAR WHERE EST_CDETALLE2=? OR EST_CDETALLE2=?";
        //   console.log("Id", resultPermiso[0].PKPER_NCODIGO);
          db.promise()
            .query(sqlCampañas,[resultPermiso[0].PKPER_NCODIGO,resultPermiso[0].PKPER_NCODIGO])
            .then(([resultCampanias]) => {
                console.log(resultCampanias);
              res.render("nomina/crearPerfil", { title: "Crear Perfil", dataCargos: resultTipoPermiso,dataCampanas:resultCampanias });
            })
            .catch((err) => console.log("ERROR::", err));
        })
        .catch((err) => console.log("ERROR::", err));
    })
    .catch((err) => console.log("ERROR::", err));
});

//obtener usuario para comparar permisos de select

module.exports = router;
