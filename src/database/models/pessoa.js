'use strict';
const cpfValidado = require('../../utils/validaCpfHelper.js');

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
			Pessoa.hasMany(models.Matricula, {
				foreignKey: 'estudante_id',
				as: 'todasMatriculas'//alias -> criação de métodos a partir do nome
			});
		}
	}
	Pessoa.init({
		nome: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [3,50],
					msg: 'Nome inválido! Campo nome deve conter ao menos 3 caracteres'
				}
			}
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: {
					args: true,
					msg: 'Formato do E-mail inválido!'
				}
			}
		},
		cpf: {
			type: DataTypes.STRING,
			validate: {
				cpfValido: (cpf) => {
					if (!cpfValidado(cpf)) throw new Error('CPF inválido!');
				}
			}
		},
		ativo: DataTypes.BOOLEAN,
		role: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Pessoa',
		tableName: 'pessoas',
		paranoid: true,
		defaultScope: {
			where: {
				ativo: true
			}
		}, 
		scopes: {
			todosOsRegistros: {
				where: {}
			}
		}
	});
	return Pessoa;
};