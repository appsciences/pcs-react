var React = require('react/addons')
    , formUtils = require('../shared/form-utils')
    , InsCarriers = require('../insCarriers/ins-carriers')
    , Specialties = require('../specialties/specialties')
    , Doctors = require('../doctors/doctors')
    , Patients = require('../patients/patients')
 //   , Locations = require('../doctors/locations')

var ReactBootstrap = require('react-bootstrap')
    , Input = ReactBootstrap.Input
    , Modal = ReactBootstrap.Modal
    , Grid = ReactBootstrap.Grid
    , Row = ReactBootstrap.Row
    , Col = ReactBootstrap.Col
    , ButtonToolbar = ReactBootstrap.ButtonToolbar
    , Label = ReactBootstrap.Label
    , TabbedArea = ReactBootstrap.TabbedArea
    , TabPane = ReactBootstrap.TabPane
    , Glyphicon = ReactBootstrap.Glyphicon
    , Button = ReactBootstrap.Button;

//var Parse = require('parse').Parse;

var Select = require('react-select')
    , WeekdaySelect = require('../shared/weekday-select')

var Table = require('reactable').Table
    , Tr = require('reactable').Tr
    , Td = require('reactable').Td;

var AppointmentModal = React.createClass({
    getInitialState: function() {
        return {
            patients: [],
            doctors: [],
            locations: [],
            specialties: [],
            insCarriers: [],
            appointment: {}
        };
    },

    componentDidMount: function() {
        var doctors = new Doctors();

        doctors.fetch().then(function(doctors){

            if (this.isMounted()) {
                this.setState({
                    doctors: doctors
                })
            }
        }.bind(this), function(err) {
            //TODO: Error Handling}
            err;

        });

        var patients = new Patients();

        patients.fetch().then(function(patients){

            if (this.isMounted()) {
                this.setState({
                    patients: patients
                })
            }
        }.bind(this), function(err) {
            //TODO: Error Handling}
            err;
        });
    },


    save: function(event){
        event.preventDefault();

        var appt = this.props.appointment;
        var insCarrs = this.state.doctors;

        var apptProps = formUtils.toNameValCollection(event.target);

        apptProps.insCarriers && apptProps.insCarriers.split(',').forEach(function(id){
            appt.add("insCarriers", insCarrs.get(id));
        });

        delete apptProps.insCarriers;

        appt.set(apptProps);

        appt.save().then(
            this.props.onRequestHide,
            function(err){
                err;
            }
        );
    },

    render: function() {
        var appt = this.props.appointment;

        var title = (appt.isNew() ? "New" : "Edit") + " Appointment";

        return (
            <Modal {...this.props} title={title} bsSize="large">
                <div className="modal-body">
                    <form id="appointmentForm" onSubmit={this.save}>
                        <TabbedArea defaultActiveKey={1}>
                            <TabPane eventKey={1} tab="Find Doctor">
                                <Grid>
                                    <Row>
                                        <Col sm={3}><Input type="text" name="city" value="New York" label='City' placeholder="City" /></Col>
                                        <Col sm={1}><Input type="text" name="state" value="NY" label='State' placeholder="State" /></Col>
                                        <Col sm={2}><Input type="text" name="zip" value="11345" label='Zip' placeholder="Zip" /></Col>
                                    </Row>
                                    <Row>
                                        <Col sm={4}>
                                            <label>Day of the Week</label>
                                            <WeekdaySelect
                                                id='weekDay'
                                                name='weekDay'
                                                placeholder="Choose..."
                                                defaultWeekDay={this.props.defaultWeekDay}
                                                multi={true}
                                            />
                                        </Col>
                                        <Col sm={4}>
                                            <label>Time of the Day</label>
                                            <Select
                                                name="timePeriod"
                                                placeholder="State"
                                                options={[
                                                    {label: 'Morning', value: 'morning'},
                                                    {label: 'Afternoon', value: 'afternoon'},
                                                    {label: 'Evening', value: 'evening'}
                                                ]}
                                                multi={true}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={4}>
                                            <label for="insCarriers">Insurance</label>
                                            <Select
                                                id='insCarriers'
                                                name='insCarriers'
                                                options={formUtils.toLabelValArrayByName(this.state.insCarriers)}
                                                multi={true}/>
                                        </Col>
                                        <Col sm={4}>
                                            <label for="specialties">Specialties</label>
                                            <Select
                                                id='specialties'
                                                name='specialties'
                                                options={formUtils.toLabelValArrayByName(this.state.specialties)}
                                                multi={true}/>
                                        </Col>
                                    </Row>
                                </Grid>
                            </TabPane>
                            <TabPane eventKey={2} tab="Appointment Info">
                                <Grid>
                                    <Row>
                                        <Col sm={4}>
                                            <label for="patient">Patient</label>
                                            <Select
                                                id='patient'
                                                name='patient'
                                                options={formUtils.toLabelValArrayByFirstLastName(this.state.patients)}
                                                defaultValue={formUtils.toIdArray(appt.get("patient"))}
                                            />
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col sm={6}>
                                            <label for="insCarriers">Doctor</label>
                                            <Select
                                                id='doctor'
                                                name='doctor'
                                                id='doctor'
                                                options={formUtils.toLabelValArrayByFirstLastName(this.state.doctors)}
                                                value={formUtils.toIdArray(appt.get("doctor"))}
                                            />
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col sm={3}><Input type="date" name="date" label='Date'/></Col>
                                        <Col sm={2}><Input type="time" name="time" label='Time' /></Col>
                                    </Row>
                                </Grid>
                            </TabPane>
                        </TabbedArea>
                    </form>
                </div>
                <div className="modal-footer">
                    <ButtonToolbar>
                        <Button bsStyle="primary" type="submit" form="appointmentForm" name="saveButton" value="Save">Save</Button>
                        <Button bsStyle="danger" onClick={this.props.onRequestHide} name="Cancel">Cancel</Button>
                    </ButtonToolbar>
                </div>
            </Modal>);
    }
});

module.exports = AppointmentModal;