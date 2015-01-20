var React = require('react');
var ReactBootstrap = require('react-bootstrap')
    , Well = ReactBootstrap.Well
    , Nav = ReactBootstrap.Nav
    , NavItem = ReactBootstrap.NavItem
    , Navbar = ReactBootstrap.Navbar
    , ButtonToolbar = ReactBootstrap.ButtonToolbar
    , Button = ReactBootstrap.Button
    , Panel = ReactBootstrap.Panel
    , Glyphicon = ReactBootstrap.Glyphicon
    , ModalTrigger = ReactBootstrap.ModalTrigger;

var Table = require('reactable').Table
    , Tr = require('reactable').Tr
    , Td = require('reactable').Td;

var Doctor = require("./doctor");

var Doctors = require("./doctors");

var DoctorModal = require("./doctor-edit.js");

var Spinner = require("react-spinner");


var DoctorList = React.createClass({
    getInitialState: function () {
        return {
            doctors: [],
            showModal: false,
            doctor: new Doctor()
        };
    },

    showReferringModal: function () {
        var doc = new Doctor();
        doc.setReferring();
        this.setState({showModal: true, doctor: doc})
    },


    getDoctorData: function (doctorData) {

        return doctorData.map(function (doc) {
            var locationlist = doc.getLocationsList().map(function (loc) {
                return (<li>{loc}</li>);
            });

            return {
                name: doc.getFullName(' '),
                locations: (<ul>{locationlist}</ul>),
                editButton: (
                    <Button bsStyle="warning" value={doc.id} onClick={this.editDoctor}>
                        <Glyphicon glyph="edit" />
                    </Button>
                )
            };
        });
    },

    editDoctor: function (event){
        this.setState({
            showModal: true,
            doctor: this.state.doctors.get(event.target.value)
        });
    },

    showSpecialistModal: function(){
        var doc = new Doctor();
        doc.setSpecialist();
        this.setState({showModal: true, doctor: doc})
    },

    hideModal: function(){
        this.setState({showModal: false})
    },

    componentDidMount: function() {
        var doctors = new Doctors();
        doctors.fetch().then(function(doctors){

            if (this.isMounted()) {
                this.setState({
                    doctors: doctors
                });
            }
        }.bind(this), function(err) {
            //TODO: Error Handling}
            err;
        });
    },

    render: function () {

        var modal = this.state.showModal &&
            (<DoctorModal
                onRequestHide={this.hideModal}
                doctor={this.state.doctor}
            />);

        return (
            <Well>
                <Panel>
                    <ButtonToolbar>
                        Doctors
                        <Button bsStyle="primary" onClick={this.showReferringModal}>Add Referring</Button>
                        <Button bsStyle="primary" onClick={this.showSpecialistModal}>Add Specialist</Button>
                    </ButtonToolbar>
                </Panel>
                <Table className="table table-striped table-condensed" columns={[
                    { key: "editButton", label: ""},
                    { key: "name", label: "Name"},
                    { key: "locations", label: "Locations"}
                ]}

                    data={this.getDoctorData(this.state.doctors)}>
                </Table>
                {modal}
            </Well>
        );
    }
});

module.exports = DoctorList;

