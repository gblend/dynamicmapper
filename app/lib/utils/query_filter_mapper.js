module.exports.mapQueryFilters = (queryFilters) => {
	const queryObject = {}

	if (Object.keys(queryFilters).length) {
		const operatorMap = {
			'gt':'$gt',
			'eq':'$eq',
			'lt':'$lt',
			'eqc':'i'
		}

		const filterOptions = Object.keys(queryFilters);
		const filterEntries = Object.entries(queryFilters);

		const regex = /\b(gt|eq|lt|eqc)\b/g
		filterEntries.forEach(filterEntry => {
			const filterField = filterEntry[0];
			const operatorValue = filterEntry[1];

			const [empty, operator, value] = operatorValue.replace(regex, (match) => `:${operatorMap[match]}`).split(':');

			if(filterOptions.includes(filterField)) {
				if(operator === 'i') {
					queryObject[filterField] = new RegExp(`${value}`, `${operator}`)
				} else queryObject[filterField] = {[operator]: Number(value)}

			}
		})
	}

	return queryObject;
}
