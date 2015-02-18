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

var InsCarrier = require("./ins-carrier");

var InsCarriers = require("./ins-carriers");

var InsCarrierModal = require("./ins-carrier-edit.js");

var InsCarrierList = React.createClass({
    getInitialState: function () {
        return {
            insCarriers: new InsCarriers(),
            showModal: false,
            insCarrier: new InsCarrier()
        };
    },

    getData: function() {
        this.state.insCarriers.fetch().then(function(carriers){

            if (this.isMounted()) {
                this.setState({
                    insCarriers: carriers
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

    showNewModal: function () {
        this.setState({showModal: true, insCarrier: new InsCarrier()})
    },


    getInsCarrierData: function (insCarrierData) {

        return insCarrierData.map(function (ins) {

            return {
                name: ins.get('name'),
                editButton: (
                    <Button bsStyle="warning" value={ins.id} onClick={this.editInsCarrier}>
                        <Glyphicon glyph="edit" />
                    </Button>
                )
            };
        }.bind(this));
    },

    editInsCarrier: function (event){
        this.setState({
            showModal: true,
            insCarrier: this.state.insCarriers.get(event.target.value || event.target.parentElement.value)
        });
    },

    hideModal: function(){
        this.getData();
        this.setState({showModal: false});
    },

    render: function () {

        var modal = this.state.showModal &&
            (<InsCarrierModal
                onRequestHide={this.hideModal}
                insCarrier={this.state.insCarrier}
            />);

        return (
            <Well>
                <Panel>
                    <ButtonToolbar>
                        Insurance
                        <Button bsStyle="primary" onClick={this.showNewModal}>Add Insurance</Button>
                    </ButtonToolbar>
                </Panel>
                <Table className="table table-striped table-condensed"
                    columns={[
                        { key: "editButton", label: ""},
                        { key: "name", label: "Name"},
                    ]}
                    data={this.getInsCarrierData(this.state.insCarriers)}
                sortable={true}
                itemsPerPage={20}/>
                {modal}
            </Well>
        );
    }
});

module.exports = InsCarrierList;
