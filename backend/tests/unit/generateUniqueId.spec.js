const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('Should generare an unique ID', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8)
    })
});