var React = require('react/addons')
    , formUtils = require('../shared/form-utils')
    , InsCarriers = require('../insCarriers/ins-carriers');

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

var Select = require('react-select');

var Griddle = require('griddle-react');

var Table = require('reactable').Table
    , Tr = require('reactable').Tr
    , Td = require('reactable').Td;

var PatientModal = React.createClass({
    getInitialState: function() {
        return {
            insCarriers: []
        };
    },

    componentDidMount: function() {
        var insCarriers = new InsCarriers();

        insCarriers.fetch().then(function(carriers){

            if (this.isMounted()) {
                this.setState({
                    insCarriers: carriers
                })
            }
        }.bind(this), function(err) {
            //TODO: Error Handling}
            err;
        });
    },


    save: function(event){
        event.preventDefault();

        var pat = this.props.patient;
        var insCarrs = this.state.insCarriers;


        var patProps = formUtils.toNameValCollection(event.target);

        patProps.insCarriers && patProps.insCarriers.split(',').forEach(function(id){
            pat.add("insCarriers", insCarrs.get(id));
        });

        delete patProps.insCarriers;

        pat.set(patProps);

        pat.save().then(
            this.props.onRequestHide,
            function(err){
                err;
            }
        );
    },

    render: function() {
        //TODO: Doesn't work
        var pat = this.props.patient;

        var title = (pat.isNew() ? "New" : "Edit") + " Patient";

        return (
            <Modal {...this.props} title={title} animation={false}>
                <div className="modal-body">
                    <form id="patientForm" onSubmit={this.save}>
                        <Grid>
                            <Row>
                                <Col sm={3}>
                                    <Input
                                        form="patientForm"
                                        type="text"
                                        name="firstName"
                                        defaultValue={pat.get("firstName")}
                                        label='Name'
                                        placeholder="First Name" />
                                </Col>
                                <Col sm={3}>
                                    <Input
                                        form="patientForm"
                                        type="text"
                                        name="lastName"
                                        defaultValue={pat.get("lastName")}
                                        label='Last Name'
                                        placeholder="Last Name" />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3}><Input type="text" name="address" value="1 1st St" label='Address' placeholder="Address" required=""/></Col>
                                <Col sm={3}><Input type="text" name="city" value="New York" label='City' placeholder="City" /></Col>
                                <Col sm={1}><Input type="text" name="state" value="NY" label='State' placeholder="State" /></Col>
                                <Col sm={1}><Input type="text" name="zip" value="11345" label='Zip' placeholder="Zip" /></Col>
                            </Row>
                            <Row>
                                <Col sm={3}><Input type="text" name="phone" value="555-555-5555"label='Phone' placeholder="Phone" /></Col>
                                <Col sm={3}><Input type="text" name="email" value="a@a.com" label='Email' placeholder="Email" /></Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <label for="insCarriers">Insurance</label>
                                    <Select
                                        id='insCarriers'
                                        name='insCarriers'
                                        options={formUtils.toLabelValArrayByName(this.state.insCarriers)}
                                        value={formUtils.toIdArray(pat.get("insCarriers"))}
                                        multi={true}/>
                                </Col>
                            </Row>
                        </Grid>
                    </form>

                </div>
                <div className="modal-footer">
                    <ButtonToolbar>
                        <Button bsStyle="primary" type="submit" form="patientForm" name="saveButton" value="Save">Save</Button>
                        <Button bsStyle="danger" onClick={this.props.onRequestHide} name="Cancel">Cancel</Button>
                    </ButtonToolbar>
                </div>
            </Modal>);
    }
});

module.exports = PatientModal;