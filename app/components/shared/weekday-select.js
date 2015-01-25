var React = require('react/addons')
    , Select = require('react-select');

var WeekdaySelect = React.createClass({

    render: function() {
        //TODO: Doesn't work
        return (
            <Select
                id='weekDay'
                name='weekDay'
                value={this.props.defaultWeekDay}
                options={[
                    {label: 'Monday', value: '1'},
                    {label: 'Tuesday', value: '2'},
                    {label: 'Wednesday', value: '3'},
                    {label: 'Thursday', value: '4'},
                    {label: 'Friday', value: '5'},
                    {label: 'Saturday', value: '6'},
                    {label: 'Sunday', value: '0'},
                ]}
                {...this.props}
            />
        )
    }
});

module.exports = WeekdaySelect;
