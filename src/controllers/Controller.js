const converteId = require('../utils/conversorStringHelper.js');

class Controller {
	constructor(entidadeService) {
		this.entidadeService = entidadeService;
	}

	async pegaTodos(req, res) {
		try {
			const listaDeRegistros = await this.entidadeService.pegaTodosRegistros();
			return res.status(200).json(listaDeRegistros);
		} catch (error) {
			return res.status(500).json({ erro: error.message });
		}
	}

	async pegaUmPorId(req, res) {
		const { id } = req.params;
		try {
			const umRegistro = await this.entidadeService.pegaUmRegistroPorId(Number(id));
			return res.status(200).json(umRegistro);
		} catch (error) {
			return res.status(500).json({ erro: error.message });
		}
	}

	async pegaUm(req, res) {
		const { ...params } = req.params;
		try {
			const umRegistro = await this.entidadeService.pegaUmRegistro(converteId(params));
			return res.status(200).json(umRegistro);
		} catch (error) {
			return res.status(500).json({ erro: error.message });
		}
	}

	async criaNovo(req, res) {
		const dadosParaCriacao = req.body;
		try {
			const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
			return res.status(200).json(novoRegistroCriado);
		} catch (error) {
			return res.status(500).json({ erro: error.message });
		}
	}

	async atualiza(req, res) {
		const { ...params } = req.params;
		const dadosAtualizados = req.body;

		try {
			const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, converteId(params));
			if (!foiAtualizado) {
				return res.status(400).json('Registro não foi atualizado');
			}

			return res.status(200).json('Atualizado com sucesso!');
		} catch (error) {
			return res.status(500).json({ erro: error.message });
		}
	}

	async exclui(req, res) {
		const { id } = req.params;
		try {
			await this.entidadeService.excluiRegistro(Number(id));
			return res.status(200).json({ mensagem: `id ${id} deletado` });
		} catch (error) {
			return res.status(500).json({ erro: error.message });
		}
	}
}

module.exports = Controller;