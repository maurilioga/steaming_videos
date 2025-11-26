const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
	constructor() {
		super(pessoaServices);
	}

	async pegaMatricula(req, res) {
		const { estudante_id } = req.params;
		try {
			const listaMatriculas = await pessoaServices.pegaMatriculasPorEstudante(Number(estudante_id));
			return res.status(200).json(listaMatriculas);
		} catch (error) {
			return res.status(500).json({ erro: error.message });
		}
	}

	async pegaTodasMatricula(req, res) {
		const { estudante_id } = req.params;
		try {
			const listaMatriculas = await pessoaServices.pegaTodasMatriculasPorEstudante(Number(estudante_id));
			return res.status(200).json(listaMatriculas);
		} catch (error) {
			return res.status(500).json({ erro: error.message });
		}
	}

	async pegaTodasPessoas(req, res) {
		try {
			const listaTodasAsPessoas = await pessoaServices.pegaPessoasEscopoTodos();
			return res.status(200).json(listaTodasAsPessoas);
		} catch (error) {
			return res.status(500).json({ erro: error.message });
		}
	}

	async inativarPessoa(req, res) {
		const { estudante_id } = req.params;
		try {
			await pessoaServices.inativarPessoaMatriculas(estudante_id);
			return res.status(200).json({ mensagem: `Estudante ${estudante_id} e suas matriculas inativados!` });
		} catch (error) {
			return res.status(500).json({ erro: error.message });
		}
	}
}

module.exports = PessoaController;