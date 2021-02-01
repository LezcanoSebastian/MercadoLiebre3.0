const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		let inSale = products.filter(product =>{
			return product.category=="in-sale"
		})
		let visited = products.filter(product =>{
			return product.category=="visited"
		})
		/* Ahora renderizamos la vista */
		res.render('index', {
			inSale,
			visited,
			toThousand
		})
	},
	search: (req, res) => {
		// Busqueda
		const result = products.filter(product =>{
			return product.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim())
			/* El trim es para evitar errores de busqueda debido a espacios de mas */
		})
		res.render('results',{
			result,
			search: req.query.keywords,
			toThousand
		})
	},
};

module.exports = controller;
