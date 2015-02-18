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
                                <Col sm={3}><Input type="text" name="address" defaultValue={pat.get("address")} label='Address' placeholder="Address" required=""/></Col>
                                <Col sm={3}><Input type="text" name="city" defaultValue={pat.get("city")} label='City' placeholder="City" /></Col>
                            </Row>
                            <Row>
                                <Col sm={3}><Input type="text" name="state" defaultValue={pat.get("state")} label='State' placeholder="State" /></Col>
                                <Col sm={3}><Input type="text" name="zip" defaultValue={pat.get("zip")} label='Zip' placeholder="Zip" /></Col>
                            </Row>
                            <Row>
                                <Col sm={3}><Input type="text" name="phone" defaultValue={pat.get("phone")} label='Phone' placeholder="Phone" /></Col>
                                <Col sm={3}><Input type="text" name="email" defaultValue={pat.get("email")} label='Email' placeholder="Email" /></Col>
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