var React = require('react/addons')
    , formUtils = require('../shared/form-utils');

var ReactBootstrap = require('react-bootstrap')
    , Input = ReactBootstrap.Input
    , Modal = ReactBootstrap.Modal
    , Grid = ReactBootstrap.Grid
    , Row = ReactBootstrap.Row
    , Panel = ReactBootstrap.Panel
    , Col = ReactBootstrap.Col
    , Label = ReactBootstrap.Label
    , TabbedArea = ReactBootstrap.TabbedArea
    , TabPane = ReactBootstrap.TabPane
    , Button = ReactBootstrap.Button;

var Select = require('react-select');

//var Parse = require('parse').Parse;

var Table = require('reactable').Table
    , Tr = require('reactable').Tr
    , Td = require('reactable').Td;

var WeekdaySelect = require('../shared/weekday-select')

var OfficeHours = React.createClass({

    render: function() {
        //TODO: Doesn't work
        return (
            <Panel>
                <h4>Office Hours</h4>
                <form id="officeHoursForm" onSubmit={this.props.addOfficeHours}>
                    <Grid>
                        <Row>
                            <Col sm={3}>
                                <label for="weeday">Day</label>
                                <WeekdaySelect
                                    id='weekDay'
                                    name='weekDay'
                                    defaultWeekDay={this.props.defaultWeekDay}
                                />
                            </Col>
                            <Col sm={2}><Input type="time" name="startTime" defaultValue="09:00" label='Open' required="true"/></Col>
                            <Col sm={2}><Input type="time" name="endTime" defaultValue="17:00" label='Close' required="true" /></Col>
                        </Row>
                        <Row>
                        &nbsp;
                        </Row>
                        <Row>
                            <Col sm={2}><Button bsStyle="primary" type="submit" name="addOfficeHoursButton" value="">Add Hours</Button></Col>
                        </Row>
                        <Row>
                            <Col sm={9}>
                                <Table className="table table-striped table-condensed" columns={[
                                    { key: "deleteButton", label: ""},
                                    { key: "weekDayName", label: "Day"},
                                    { key: "startTime", label: "Open"},
                                    { key: "endTime", label: "Close"},
                                ]}
                                    data={this.props.officeHours}>
                                </Table>
                            </Col>
                        </Row>
                    </Grid>
                </form>
            </Panel>
        )
    }
});

module.exports = OfficeHours;