var React = require('react/addons')
    , formUtils = require('../shared/form-utils');

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

var Table = require('reactable').Table
    , Tr = require('reactable').Tr
    , Td = require('reactable').Td;

var InsCarrierModal = React.createClass({
    getInitialState: function() {
        return {
            insCarriers: []
        };
    },



    save: function(event){
        event.preventDefault();

        this.props.insCarrier.set(
            formUtils.toNameValCollection(event.target));

        this.props.insCarrier.save().then(
            this.props.onRequestHide,
            function(err){
                err;
            }
        );
    },

    render: function() {
        //TODO: Doesn't work
        var ins = this.props.insCarrier;

        var title = (ins.isNew() ? "New" : "Edit") + " InsCarrier";

        return (
            <Modal {...this.props} title={title} bsSize="large">
                <div className="modal-body">
                    <form id="insCarrierForm" onSubmit={this.save}>
                        <Grid>
                            <Row>
                                <Col sm={3}>
                                    <Input
                                        form="insCarrierForm"
                                        type="text"
                                        name="name"
                                        defaultValue={ins.get("name")}
                                        label='Name'
                                        placeholder="Name" />
                                </Col>
                            </Row>
                        </Grid>
                    </form>
                </div>
                <div className="modal-footer">
                    <ButtonToolbar>
                        <Button bsStyle="primary" type="submit" form="insCarrierForm" name="saveButton" value="Save">Save</Button>
                        <Button bsStyle="danger" onClick={this.props.onRequestHide} name="Cancel">Cancel</Button>
                    </ButtonToolbar>
                </div>
            </Modal>);
    }
});

module.exports = InsCarrierModal;