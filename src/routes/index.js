const express = require('express');
const pessoas = require('./pessoaRoute.js');
const cursos = require('./cursoRoute.js');
const categorias = require('./categoriaRoute.js');

module.exports = app => {
	app.use(
		express.json(),
		pessoas,
		categorias,
		cursos
	);
};