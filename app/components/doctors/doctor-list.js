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

var Doctor = require("./doctor");

var Doctors = require("./doctors");

var DoctorModal = require("./doctor-edit.js");

var DoctorList = React.createClass({
    getInitialState: function () {
        return {
            doctors: new Doctors(),
            showModal: false,
            doctor: new Doctor()
        };
    },

    showReferringModal: function () {
        var doc = new Doctor();
        doc.setReferring();
        this.setState({showModal: true, doctor: doc})
    },


    getDoctorData: function (doctorData, isReferring) {

        return doctorData.filter(function(doc){

            return doc.isReferring == isReferring;

        }).map(function (doc) {

            var locationList = doc.getLocationsList().map(function (loc) {
                return (<tr><td>{loc}</td></tr>);
            });

            var specialtiesList = doc.get("specialties") && doc.get("specialties").map(function (spec) {
                return (<tr><td>{spec.get('name')}</td></tr>);
            });

            return {
                name: doc.getFullName(' '),
                locations: (<table>{locationList}</table>),
                specialties: (<table>{specialtiesList}</table>),
                editButton: (
                    <Button bsStyle="warning" value={doc.id} onClick={this.editDoctor}>
                        <Glyphicon glyph="edit" />
                    </Button>
                )
            };
        }.bind(this));
    },

    editDoctor: function (event){
        this.setState({
            showModal: true,
            doctor: this.state.doctors.get(event.target.value || event.target.parentElement.value)
        });
    },

    showSpecialistModal: function(){
        var doc = new Doctor();
        doc.setSpecialist();
        this.setState({showModal: true, doctor: doc})
    },

    hideModal: function(){
        this.getData();
        this.setState({showModal: false})
    },

    getData: function () {
        this.state.doctors.fetch().then(function(doctors){

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

    componentDidMount: function() {
        this.getData();
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
                        <Button bsStyle="primary" onClick={this.showSpecialistModal}>Add Specialists</Button>
                    </ButtonToolbar>
                </Panel>
                <TabbedArea defaultActiveKey={1}>
                    <TabPane eventKey={1} tab="Referring">
                        <Table className="table table-striped table-condensed"
                            columns={[
                                { key: "editButton", label: ""},
                                { key: "name", label: "Name"},
                                { key: "locations", label: "Locations"}
                            ]}
                            data={this.getDoctorData(this.state.doctors, true)}
                            sortable={true}
                            itemsPerPage={20}>
                        </Table>
                    </TabPane>
                    <TabPane eventKey={2} tab="Specialists">
                        <Table className="table table-striped table-condensed"
                            columns={[
                                { key: "editButton", label: ""},
                                { key: "name", label: "Name"},
                                { key: "locations", label: "Locations"},
                                { key: "specialties", label: "Specialties"}
                            ]}
                            sortable={true}
                            itemsPerPage={20}
                            data={this.getDoctorData(this.state.doctors, false)}>
                        </Table>
                    </TabPane>
                 </TabbedArea>
                {modal}
            </Well>
        );
    }
});

module.exports = DoctorList;

