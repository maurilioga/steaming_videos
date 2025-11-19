const database = require('../models');

class Services {
	constructor(nomeDoModel) {
		this.model = nomeDoModel;
	}

	async pegaTodosRegistros() {
		return database[this.model].findAll();
	}

	async pegaUmRegistroPorId(id) {
		return database[this.model].findByPk(id);
	}

	async criaRegistro(dadosDoRegistro) {
		return database[this.model].create(dadosDoRegistro);
	}

	async atualizaRegistro(dadosAtualizados, id) {
		const listRegistrosAtualizados = database[this.model].update(dadosAtualizados, {
			where: { id: id }//id
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