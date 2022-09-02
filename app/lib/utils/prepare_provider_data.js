module.exports.prepareLoadData = ({providerId, data}) => {

	if (!providerId || !data.length) return {};

	return data.map(element => {
		element.providerId = providerId;
		return element;
	});
}
