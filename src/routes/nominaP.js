const router = require("express").Router();
const db = require("../database");
const path = require("path");
const ExcelJS = require("exceljs");
const Moment = require("moment");
const Class2 = require("../Class2");
const { DeCrypt } = require("../public/js/Class2");
const { query } = require("../database");

let permiso='';
 

router.get("/crearPerfil/:username", (req, res) => {
   let username = req.params.username;
   const sqlPermiso = "SELECT PER_CNIVEL FROM dbp_nomina.TBL_RPERMISO WHERE FKPER_CUSUARIOS=?";
   db.promise()
  .query(sqlPermiso,[username])
  .then(([resultPermiso]) => {
    console.log(resultPermiso);
    // res.render("nomina/nomListCampanas", { title: "Nomina Campañas", campañas:resultCampañas});
  })
  .catch((err) => console.log("ERROR::", err));
  
  });

//obtener usuario para comparar permisos de select

module.exports = router;
