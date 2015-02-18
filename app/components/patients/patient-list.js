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

var Patient = require("./patient");

var Patients = require("./patients");

var PatientModal = require("./patient-edit.js");

var PatientList = React.createClass({
    getInitialState: function () {
        return {
            patients: new Patients(),
            showModal: false,
            patient: new Patient()
        };
    },

    showNewModal: function () {
        this.setState({showModal: true, patient: new Patient()})
    },


    getPatientData: function (patientData) {

        return patientData.map(function (pat) {

            return {
                name: pat.getFullName(' '),
                address: pat.getFullAddress(),
                editButton: (
                    <Button bsStyle="warning" value={pat.id} onClick={this.editPatient}>
                        <Glyphicon glyph="edit" />
                    </Button>
                )
            };
        }.bind(this));
    },

    editPatient: function (event){
        this.setState({
            showModal: true,
            patient: this.state.patients.get(event.target.value || event.target.parentElement.value)
        });
    },

    hideModal: function(){
        this.getData();
        this.setState({showModal: false})
    },

    getData: function(){
        this.state.patients.fetch().then(function(patients){

            if (this.isMounted()) {
                this.setState({
                    patients: patients
                });
            }
        }.bind(this), function(err) {
            //TODO: Error Handling}
            err;
        });
    },

    componentDidMount: function() {
        this.getData();
    },

    render: function () {

        var modal = this.state.showModal &&
            (<PatientModal
                onRequestHide={this.hideModal}
                patient={this.state.patient}
            />);

        return (
            <Well>
                <Panel>
                    <ButtonToolbar>
                        Patients
                        <Button bsStyle="primary" onClick={this.showNewModal}>Add Patient</Button>
                    </ButtonToolbar>
                </Panel>
                <Table className="table table-striped table-condensed"
                    columns={[
                        { key: "editButton", label: ""},
                        { key: "name", label: "Name"},
                        { key: "address", label: "Address"}
                    ]}
                    sortable={true}
                    itemsPerPage={20}
                    data={this.getPatientData(this.state.patients)}/>
                {modal}
            </Well>
        );
    }
});

module.exports = PatientList;

