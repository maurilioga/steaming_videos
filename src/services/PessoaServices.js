const dataSource = require('../database/models');
const Services = require('./Services.js');

class PessoaServices extends Services {
	constructor() {
		super('Pessoa');
		this.matriculaServices = new Services('Matricula');
	}

	async pegaMatriculasPorEstudante(estudante_id) {
		const estudante = await super.pegaUmRegistroPorId(estudante_id);
		const listaMatriculas = await estudante.getAulasMatriculadas();

		return listaMatriculas;
	}

	async pegaTodasMatriculasPorEstudante(estudante_id) {
		const estudante = await super.pegaUmRegistroPorId(estudante_id);
		const listaMatriculas = await estudante.getTodasMatriculas();

		return listaMatriculas;
	}

	async pegaPessoasEscopoTodos() {
		return await super.pegaRegistrosPorEscopo('todosOsRegistros');
	}

	async inativarPessoaMatriculas(estudanteId) {
		return dataSource.sequelize.transaction(async(t) => {
			await super.atualizaRegistro({ ativo: false }, { id: estudanteId }, t);
			await this.matriculaServices.atualizaRegistro({ status: 'cancelado' }, { estudante_id: estudanteId }, t);
		});
	}
}

module.exports = PessoaServices;