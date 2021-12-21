const router = require("express").Router();

// ! Para el Control de Usuarios
// ? Agregar a route como middleware que solo pueda acceder el rol specificado
const { isAdministrador } = require("../lib/auth");

router.get("/dashboard", (req, res) => {
  res.render("wasa/dashboard", { title: "Dashboard" });
});

router.get('/inicio', (req, res) => {
  res.render('inicio', { title: 'Inicio' });
});

module.exports = router;
