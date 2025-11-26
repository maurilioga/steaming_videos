const Sequelize = require('sequelize');

const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
	constructor() {
		super(matriculaServices);
	}

	async buscaMatriculaPorEstudante(req, res) {
		const { estudante_id } = req.params;
		try {
			const listaMatriculasPorEstudante = await matriculaServices.buscaContaRegistros({ 
				where: {
					estudante_id: Number(estudante_id),
					status: 'matriculado'
				},
				limit: 2,
				order: [['id', 'DESC']]
			});
			return res.status(200).json(listaMatriculasPorEstudante);
		} catch (error) {
			return res.status(500).json({ erro: error.message });
		}
	}

	async buscaCursosLotados(req, res) {
		const lotacaoMaxima = 2;
		try {
			const cursosLotacaoMaxima = await matriculaServices.buscaContaRegistros({ 
				where: {
					status: 'matriculado'	
				},
				attributes: ['curso_id'],
				group: ['curso_id'],
				having: Sequelize.literal(`count(curso_id) >= ${lotacaoMaxima}`)		
			});
			return res.status(200).json(cursosLotacaoMaxima.count);
		} catch (error) {
			return res.status(500).json({ erro: error.message });
		}
	}
}

module.exports = MatriculaController;