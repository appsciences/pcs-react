var formUtils = require('./form-utils');

describe('Form Utils Test', function () {

    describe('Collect form names and values', function() {

        it('should construct properties', function () {
            //spec body

            var form = [
                {name: 'name1', value: 'val1'},
                {name: 'name2', value: 'val2'}
            ];

            expect(formUtils.toNameValCollection(form)).toBe([
                {name1:'val1'},
                {name2:'val2'}
            ]);

        });
    });
});
