jest.dontMock('../app/components/shared/form-utils');

var ParseObj = function(id, vals){
    this.id = id;
    this.vals = vals;

    this.get = function(what)
    {
        return this.vals[what];
    }
}


describe('form utils', function() {

    var formUtils = require('../app/components/shared/form-utils');

    it('toLabelValArrayByName turns parse objects {id:1, name:"name1"}, {id:2, name:"name2"} into label/value collection', function() {
        var formUtils = require('../app/components/shared/form-utils');

        var result = formUtils.toLabelValArrayByName([
            new ParseObj(1,{name:"name1"}),
            new ParseObj(2,{name:"name2"})
        ]);

        expect(result[0].label).toBe('name1');
        expect(result[0].value).toBe(1);
        expect(result[1].label).toBe('name2');
        expect(result[1].value).toBe(2);

    });

    it('toLabelValArrayByName turns parse objects {id:1, name:"name1"}, {id:2, name:"name2"} into label/value collection', function() {
        var formUtils = require('../app/components/shared/form-utils');

        var result = formUtils.toLabelValArrayByFirstLastName([
            new ParseObj(1,{firstName:"first-name1", lastName:"last-name1"}),
            new ParseObj(2,{firstName:"first-name2", lastName:"last-name2"})
        ]);

        expect(result[0].label).toBe('first-name1 last-name1');
        expect(result[0].value).toBe(1);
        expect(result[1].label).toBe('first-name2 last-name2');
        expect(result[1].value).toBe(2);

    });


    it('toNameValCollection turns form-like [{name:"name1", value:"value1"},...] into [name1:"value1",...]', function() {

        var result = formUtils.toNameValCollection([
            {name:"name1", value:"value1"},
            {name:"name2", value:"value2"},
            {name:"button1", value:"value3"},
            {name:"", value:"value4"}
        ]);

        expect(result).toEqual({"name1":"value1", "name2":"value2"});
    });

    it('toIdArray turns parse objects {id:1}, {id:2} into [1,2]', function() {

        var result = formUtils.toIdArray([
            new ParseObj(1,"name1"),
            new ParseObj(2,"name2")
        ]);

        expect(result).toEqual([1,2]);
    });

    it('removeItemAtIndex turns returns array [1,2,3] sans 2 => [1,3]', function() {

        expect(formUtils.removeItemAtIndex([1,2,3],0)).toEqual([2,3]);
        expect(formUtils.removeItemAtIndex([1,2,3],1)).toEqual([1,3]);
        expect(formUtils.removeItemAtIndex([1,2,3],2)).toEqual([1,2]);

    });

});