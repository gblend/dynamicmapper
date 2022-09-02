const {NotFoundError, CustomAPIError, BadRequestError} = require('../../app/lib/errors');
const {StatusCodes} = require('../../app/lib/utils');

describe('NotFoundError', () => {
	it('should return not found error', () => {
		const message = 'Resource not found.';
		const notFound = new NotFoundError(message);
		expect(notFound.statusCode).toBe(StatusCodes.NOT_FOUND);
		expect(notFound.message).toBe(message);
	});
});

describe('CustomAPIError', () => {
	it('should return custom API error', () => {
		const message = 'Custom message.';
		const customAPIError = new CustomAPIError(message);
		expect(customAPIError.message).toBe(message);
	});
});

describe('BadRequestError', () => {
	it('should return bad request error', () => {
		const message = 'Bad request.';
		const badRequestError = new BadRequestError(message);
		expect(badRequestError.statusCode).toBe(StatusCodes.BAD_REQUEST);
		expect(badRequestError.message).toBe(message);
	});
});
