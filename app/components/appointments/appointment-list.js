var React = require('react');
var ReactBootstrap = require('react-bootstrap')
    , Well = ReactBootstrap.Well
    , Nav = ReactBootstrap.Nav
    , NavItem = ReactBootstrap.NavItem
    , Navbar = ReactBootstrap.Navbar
    , ButtonToolbar = ReactBootstrap.ButtonToolbar
    , Button = ReactBootstrap.Button
    , Panel = ReactBootstrap.Panel
    , TabbedArea = ReactBootstrap.TabbedArea
    , TabPane = ReactBootstrap.TabPane
    , Glyphicon = ReactBootstrap.Glyphicon
    , ModalTrigger = ReactBootstrap.ModalTrigger;

var Table = require('reactable').Table
    , Tr = require('reactable').Tr
    , Td = require('reactable').Td;

var Appointment = require("./appointment");

var Appointments = require("./appointments");

var AppointmentModal = require("./appointment-edit.js");

var AppointmentList = React.createClass({
    getInitialState: function () {
        return {
            appointments: [],
            showModal: false,
            appointment: new Appointment()
        };
    },

    showNewModal: function () {
        this.setState({showModal: true, appointment: new Appointment()})
    },


    getAppointmentData: function (appointmentData) {

        return appointmentData.map(function (appt) {

            return {
                date: appt.get('date') && appt.get('date').toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour:'numeric',
                    minute:'numeric'}),
                patientName: appt.get('patient') && appt.get('patient').getFullName(' '),
                patientPhone: appt.get('patient') && appt.get('patient').get('phone'),
                doctorAddress: appt.get('location') && appt.get('location').getFullAddress(),
                editButton: (
                    <Button bsStyle="warning" value={appt.id} onClick={this.editAppointment}>
                        <Glyphicon glyph="edit" />
                    </Button>
                )
            };
        }.bind(this));
    },

    editAppointment: function (event){
        this.setState({
            showModal: true,
            appointment: this.state.appointments.get(event.target.value || event.target.parentElement.value)
        });
    },

    hideModal: function(){
        this.setState({showModal: false})
    },

    componentDidMount: function() {
        var appointments = new Appointments();
        appointments.fetch().then(function(appointments){

            if (this.isMounted()) {
                this.setState({
                    appointments: appointments
                });
            }
        }.bind(this), function(err) {
            //TODO: Error Handling}
            err;
        });
    },

    render: function () {

        var modal = this.state.showModal &&
            (<AppointmentModal
                onRequestHide={this.hideModal}
                appointment={this.state.appointment}
            />);

        return (
            <Well>
                <Panel>
                    <ButtonToolbar>
                        Appointments
                        <Button bsStyle="primary" onClick={this.showNewModal}>Add Appointment</Button>
                    </ButtonToolbar>
                </Panel>
                <Table className="table table-striped table-condensed"
                    columns={[
                        { key: "editButton", label: ""},
                        { key: "date", label: "Date"},
                        { key: "patientName", label: "Name"},
                        { key: "patientPhone", label: "Phone"},
                        { key: "doctorAddress", label: "Address"}
                    ]}
                    sortable={true}
                    itemsPerPage={20}
                    data={this.getAppointmentData(this.state.appointments)}/>
                {modal}
            </Well>
        );
    }
});

module.exports = AppointmentList;

