var React = require('react/addons')
    , formUtils = require('../shared/form-utils')
    , InsCarriers = require('../insCarriers/ins-carriers')
    , Specialties = require('../specialties/specialties')
    , Doctors = require('../doctors/doctors')
    , Patients = require('../patients/patients')
    , Locations = require('../doctors/locations')

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
    , Button = ReactBootstrap.Button
    , Select = ReactBootstrap.Select
    , Option = ReactBootstrap.Option;

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
            unfilteredDoctors: [],
            locations: [],
            specialties: [],
            insCarriers: []
        };
    },

    componentDidMount: function() {
        var doctors = new Doctors();

        doctors.fetch().then(function(doctors){

            if (this.isMounted()) {
                this.setState({
                    doctors: this.getDoctorData(doctors),
                    unfilteredDoctors: this.getDoctorData(doctors)
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

        var insCarriers = new InsCarriers();

        insCarriers.fetch().then(function(insCarriers){

            if (this.isMounted()) {
                this.setState({
                    insCarriers: insCarriers
                })
            }
        }.bind(this), function(err) {
            //TODO: Error Handling}
            err;
        });

        var specialties = new Specialties();

        specialties.fetch().then(function(specialties){

            if (this.isMounted()) {
                this.setState({
                    specialties: specialties
                })
            }
        }.bind(this), function(err) {
            //TODO: Error Handling}
            err;
        });

        var locations = new Locations();

        locations.fetch().then(function(locations){

            if (this.isMounted()) {
                this.setState({
                    locations: locations
                })
            }
        }.bind(this), function(err) {
            //TODO: Error Handling}
            err;
        });
    },

    getDoctorData: function (doctorData) {
        return doctorData.reduce(function(locations, doc){

            if(doc.get('locations') && doc.isSpecialist) {
                locations = locations.concat(doc.get('locations').map(function (location) {

                    var formattedSpecialtiesList = doc.get("specialties") && doc.get("specialties").map(function (spec) {
                            return (<tr><td>{spec.get('name')}</td></tr>);
                        });

                    return {
                        fullAddress: location.get('address') + ' ' + location.get('city') + ' Ph: ' + location.get('phone'),
                        city: location.get('city'),
                        state: location.get('state'),
                        zip: location.get('zip'),
                        doctorName: doc.getFullName(' '),
                        specialties: doc.get('specialties') && doc.get("specialties").map(
                            function(spec){
                                return spec.id;
                            }),
                        formattedSpecialties: (<table>{formattedSpecialtiesList}</table>),
                        insCarriers: doc.get('insCarriers') && doc.get("insCarriers").map(
                            function(ins){
                                return ins.id;
                            }),
                        selectButton: (<input type="radio" name="location" value={location.id}/>)
                    }
                }.bind(this)));
            }

            return locations;
        }.bind(this),[]);
    },

    filterBySpecialty: function(val){


        var filtered = this.state.unfilteredDoctors.filter(function(doc){
            return doc.specialties && doc.specialties.indexOf(val) > -1;
        });

        this.setState({doctors: filtered});
    },

    filterByInsCarrier: function(val){


        var filtered = this.state.unfilteredDoctors.filter(function(doc){
            return doc.insCarriers && doc.insCarriers.indexOf(val) > -1;
        });

        this.setState({doctors: filtered});
    },

    filterDoctors: function(event){

        var filtered = this.state.unfilteredDoctors.filter(function(doc){
            return doc[event.target.name] && doc[event.target.name].indexOf(event.target.value) > -1;
        });

        this.setState({doctors: filtered});
    },

    save: function(event){
        event.preventDefault();

        var appt = this.props.appointment;

        appt.set('patient', this.state.patients.get(event.target.patient.value));
        appt.set('location', this.state.locations.get(event.target.location.value));

        var date = new Date(event.target.date.value + ' ' + event.target.time.value);
        appt.set('date', date);

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
                        <Grid>
                            <Row>
                                <Col sm={4}>
                                    <label for="patient">Patient</label>
                                    <Select
                                        required={true}
                                        id='patient'
                                        name='patient'
                                        options={formUtils.toLabelValArrayByFirstLastName(this.state.patients)}
                                        defaultValue={formUtils.toIdArray(appt.get("patient"))}
                                    />
                                </Col>

                            </Row>
                            <Row>
                                <Col sm={3}><Input type="text" onChange={this.filterDoctors} name="city" label='City' placeholder="City" /></Col>
                                <Col sm={1}><Input type="text" onChange={this.filterDoctors} name="state" label='State' placeholder="State" /></Col>
                                <Col sm={2}><Input type="text" onChange={this.filterDoctors} name="zip" label='Zip' placeholder="Zip" /></Col>
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
                                        placeholder="Time of the day"
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
                                        onChange={this.filterByInsCarrier}
                                        id='insCarriers'
                                        name='insCarriers'
                                        options={formUtils.toLabelValArrayByName(this.state.insCarriers)}
                                    />


                                </Col>
                                <Col sm={4}>
                                    <label for="specialties">Specialty</label>
                                    <Select
                                        id='specialties'
                                        name='specialties'
                                        options={formUtils.toLabelValArrayByName(this.state.specialties)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={8}>
                                    <h4>Doctors</h4>
                                    <Table className="table table-striped table-condensed"
                                        columns={[
                                            { key: "selectButton", label: ""},
                                            { key: "doctorName", label: "Name"},
                                            { key: "fullAddress", label: "Address"},
                                            { key: "formattedSpecialties", label: "Specialties"}
                                        ]}
                                        sortable={true}
                                        itemsPerPage={10}
                                        data={this.state.doctors}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3}><Input required={true} type="date" name="date" label='Date'/></Col>
                                <Col sm={2}><Input  required={true} type="time" name="time" label='Time' /></Col>
                            </Row>
                        </Grid>
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