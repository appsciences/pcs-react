var React = require('react');
var Griddle = require('griddle-react');
var ReactBootstrap = require('react-bootstrap')
    , Well = ReactBootstrap.Well
    , Nav = ReactBootstrap.Nav
    , NavItem = ReactBootstrap.NavItem
    , Navbar = ReactBootstrap.Navbar
    , ButtonToolbar = ReactBootstrap.ButtonToolbar
    , Button = ReactBootstrap.Button
    , Panel = ReactBootstrap.Panel
    , ModalTrigger = ReactBootstrap.ModalTrigger;


var Doctor = require("./doctor");

var Doctors = require("./doctors");

var DoctorModal = require("./doctor-edit.js");

var Spinner = require("react-spinner");

var fakeData =  [
    {
        "id": 0,
        "name": "Mayer Leonard",
        "city": "Kapowsin",
        "state": "Hawaii",
        "country": "United Kingdom",
        "company": "Ovolo",
        "favoriteNumber": 7
    }
];

var getDoctorData = function(doctorData){

    return doctorData.map(function (doc) {
        return {
            Name: doc.getFullName(' '),
            Location: doc.getLocationsList().join('<br>')
        };
    });
}


var DoctorList = React.createClass({
    getInitialState: function() {
        return {
            doctors: [],
            showModal: true,
            doctor: new Doctor()
        };
    },

    showReferringModal: function(){
        var doc = new Doctor();
        doc.setReferring();
        this.setState({showModal: true, doctor: doc})
    },

    showSpecialistModal: function(){
        var doc = new Doctor();
        doc.setSpecialist();
        this.setState({showModal: true, doctor: doc})
    },

    hideModal: function(){
        this.setState({showModal: false})
    },

    saveDoctor: function(form){

    },

    componentDidMount: function() {
        var doctors = new Doctors();
        doctors.fetch().then(function(doctors){

            if (this.isMounted()) {
                this.setState({
                    doctors: getDoctorData(doctors)
                })
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
                <Griddle
                    results={this.state.doctors}
                    tableClassName="table table-condensed table-striped table-hover"
                    showFilter={true}
                    showSettings={true}
                    columns={["Name", "Locations"]}
                />
                {modal}
            </Well>
        );
    }
});


module.exports = DoctorList;
