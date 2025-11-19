const Services = require('./Services.js');

class PessoaServices extends Services {
	constructor() {
		super('Pessoa');
	}

	async pegaMatriculasPorEstudante(estudante_id) {
		const estudante = await super.pegaUmRegistroPorId(estudante_id);
		const listaMatriculas = await estudante.getAulasMatriculadas();

		return listaMatriculas;
	}
}

module.exports = PessoaServices;