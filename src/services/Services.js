const database = require('../database/models');

class Services {
	constructor(nomeDoModel) {
		this.model = nomeDoModel;
	}

	async pegaTodosRegistros(where = {}) {
		return database[this.model].findAll({ where: { ...where } });
	}

	async pegaRegistrosPorEscopo(escopo) {
		return database[this.model].scope(escopo).findAll();
	}

	async pegaUmRegistroPorId(id) {
		return database[this.model].findByPk(id);
	}

	async pegaUmRegistro(where) {
		return database[this.model].findOne({ where: { ...where } });
	}

	async buscaContaRegistros(options) {
		return database[this.model].findAndCountAll({ ...options });
	}

	async criaRegistro(dadosDoRegistro) {
		return database[this.model].create(dadosDoRegistro);
	}

	async atualizaRegistro(dadosAtualizados, where, transacao = {}) {
		const listRegistrosAtualizados = await database[this.model].update(dadosAtualizados, {
			where: { ...where },//id
			transaction: transacao
		});

		if (listRegistrosAtualizados[0] === 0) {
			return false;
		}

		return true;
	}

	async excluiRegistro(id) {
		return database[this.model].destroy({ where: { id: id } });
	}
}

module.exports = Services;