'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Pessoa extends Model {
		static associate(models) {
			Pessoa.hasMany(models.Curso, {
				foreignKey: 'docente_id'
			});
			Pessoa.hasMany(models.Matricula, {
				foreignKey: 'estudante_id',
				scope: { status: 'matriculado' },//filtro para consulta -> where
				as: 'aulasMatriculadas'//alias -> criação de métodos a partir do nome
			});
		}
	}
	Pessoa.init({
		nome: DataTypes.STRING,
		email: DataTypes.STRING,
		cpf: DataTypes.STRING,
		ativo: DataTypes.BOOLEAN,
		role: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Pessoa',
		tableName: 'pessoas'
	});
	return Pessoa;
};