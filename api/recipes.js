const JSONReceitas = require('./dict_recipes.json');

function filter (query, response) {
    const ingredientes = query.ingredientes;
    if (ingredientes) {
        let ingredientesDisponiveis = ingredientes.split(',');
        const todasASReceitas = Object.values(JSONReceitas);
        let possiveisReceitas = [];
        todasASReceitas.forEach(receitaAtual => {
            ingredientesReceitaAtual = receitaAtual.recipe;

            for (const ingrediente of ingredientesReceitaAtual) {
                if (ingredientesDisponiveis.indexOf(ingrediente) === -1) {
                    return;
                }
            }

            possiveisReceitas.push(receitaAtual);
        });

        response(JSON.stringify(possiveisReceitas));

    } else {
        response(Object.values(JSONReceitas)); //retorna json contendo todas as receitas
    }
};

module.exports.handler = (event, context, callback) => {
	const query =  event.queryStringParameters;

	function response (data) {
		callback(null, {
			body: data,
			statusCode: 200,
		});
	}
	filter(query, response);
}