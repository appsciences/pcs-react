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

var Specialty = require("./specialty");

var Specialties = require("./specialties");

var SpecialtyModal = require("./specialty-edit.js");

var SpecialtyList = React.createClass({
    getInitialState: function () {
        return {
            specialties: new Specialties(),
            showModal: false,
            specialty: new Specialty()
        };
    },

    loadData: function(){
        this.state.specialties.fetch().then(function(carriers){

            if (this.isMounted()) {
                this.setState({
                    specialties: carriers
                });
            }
        }.bind(this), function(err) {
            //TODO: Error Handling}
            err;
        });
    },

    componentDidMount: function() {
        this.loadData();
    },

    showNewModal: function () {
        this.setState({showModal: true, specialty: new Specialty()})
    },


    getSpecialtyData: function (specialtyData) {

        return specialtyData.map(function (spec) {

            return {
                name: spec.get('name'),
                editButton: (
                    <Button bsStyle="warning" value={spec.id} onClick={this.editSpecialty}>
                        <Glyphicon glyph="edit" />
                    </Button>
                )
            };
        }.bind(this));
    },

    editSpecialty: function (event){
        this.setState({
            showModal: true,
            specialty: this.state.specialties.get(event.target.value || event.target.parentElement.value)
        });
    },

    //TODO: Need to detect when it's a cancel and not reload
    hideModal: function(){
        this.setState({showModal: false});
        this.loadData();
    },

    render: function () {

        var modal = this.state.showModal &&
            (<SpecialtyModal
                onRequestHide={this.hideModal}
                specialty={this.state.specialty}
            />);

        return (
            <Well>
                <Panel>
                    <ButtonToolbar>
                        Specialties
                        <Button bsStyle="primary" onClick={this.showNewModal}>Add Specialty</Button>
                    </ButtonToolbar>
                </Panel>
                <Table className="table table-striped table-condensed"
                    columns={[
                        { key: "editButton", label: ""},
                        { key: "name", label: "Name"},
                    ]}
                    data={this.getSpecialtyData(this.state.specialties)}
                    sortable={true}
                    itemsPerPage={20}
                />
                {modal}
            </Well>
        );
    }
});

module.exports = SpecialtyList;
