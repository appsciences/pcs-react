var React = require('react/addons')
    , formUtils = require('../shared/form-utils')
    , parseUtils = require('../shared/parse-utils')
    , Doctor = require('./doctor')
    , Location = require('./location')
    , InsCarriers = require('../shared/ins-carriers')
    , Specialties = require('../shared/specialties')
    , SalesPeople = require('../sales-person/sales-people');

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
    , Button = ReactBootstrap.Button;

//var Parse = require('parse').Parse;

var Select = require('react-select');

var Griddle = require('griddle-react');

var Table = require('reactable').Table
    , Tr = require('reactable').Tr
    , Td = require('reactable').Td;

var toDelimitedNameString = function (parseObjCol, delimiter) {
    return parseObjCol.map(function (parseObj) {
        return parseObj.get("name");
    }).join(delimiter);
}

var toLabelValArray = function (parseObjCol) {
    return parseObjCol.map(function (parseObj) {
        return {label: parseObj.get("name"), value: parseObj.id};
    });
}


var DoctorModal = React.createClass({
    getInitialState: function() {
        return {
            doctor: this.props.doctor,
            locations: [],
            insCarriers: [],
            specialties: [],
            salesPeople: [],
            location: {}
        };
    },

    componentDidMount: function() {
        var insCarriers = new InsCarriers();
        var specialties = new Specialties();
        var salesPeople = new SalesPeople();

        salesPeople.fetch().then(function(people){

            if (this.isMounted()) {
                this.setState({
                    salesPeople: people
                })
            }
        }.bind(this), function(err) {
            //TODO: Error Handling}
        });

        specialties.fetch().then(function(specs){

            if (this.isMounted()) {
                this.setState({
                    specialties: specs
                })
            }
        }.bind(this), function(err) {
            //TODO: Error Handling}
            err;
        });

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

    addLocation: function(event) {
        event.preventDefault();

        this.setState(
            {locations: this.state.locations.concat(formUtils.toNameValCollection(event.target))}
        );
    },

    save: function(event){
        event.preventDefault();

        var doc = this.props.doctor;

        doc.set(formUtils.toNameValCollection(event.target));

        var insCarrs = this.state.insCarriers;

        this.state.locations.forEach(function(location){
            var parseLoc = new Location;

            location.insCarriers.split(',').forEach(function(id){
                parseLoc.add("insCarriers", insCarrs.get(id));
            });

            doc.add("locations", parseLoc);
        });

        event.target.specialties.value.split(',').forEach(function(id){
            doc.add("specialties", specialties.get(id));
        });

        event.target.salesPeople.value.split(',').forEach(function(id){
            doc.add("salesPeople", specialties.get(id));
        });

        doc.save().then(
            this.props.onRequestHide,
            function(err){
                err;
            }
        );
    },

    render: function() {
        var title =
            (this.props.doctor.isNew() ? "New" : "Edit") + " " +
            (this.props.doctor.isSpecialist) ? "Specialist" : "Referring Doctor";

        return (
            <Modal {...this.props} title={title} bsSize="large">
                <div className="modal-body">
                    <TabbedArea defaultActiveKey={1}>
                        <TabPane eventKey={1} tab="Doctor Info">
                            <form id="doctorForm" onSubmit={this.save}>
                                <Grid>
                                    <Row>
                                        <legend>Name/Company</legend>
                                        <Col sm={4}><Input form="doctorForm" type="text" name="firstName" value="Boris" label='Name' placeholder="First Last" /></Col>
                                        <Col sm={4}><Input form="doctorForm" type="text" name="lastName" value="Becker" label='Company' placeholder="Company" /></Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6}>
                                            <label for="specialties">Insurance</label>
                                            <Select
                                                id='insCarriers'
                                                name='insCarriers'
                                                options={toLabelValArray(this.state.insCarriers)}
                                                multi='true'/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6}>
                                            <label for="salesPeople">Insurance</label>
                                            <Select
                                                id='insCarriers'
                                                name='insCarriers'
                                                options={toLabelValArray(this.state.insCarriers)}
                                                multi='true'/>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col sm={6}><Input type="textarea" form="doctorForm" name="Notes" label='Notes' placeholder="Notes" /></Col>
                                    </Row>
                                </Grid>
                            </form>
                        </TabPane>
                        <TabPane eventKey={2} tab="Locations">
                            <form id="locationForm" onSubmit={this.addLocation}>
                                <Grid>
                                    <Row>
                                        <legend>Locations</legend>
                                        <Col sm={3}><Input type="text" value="1 1st St" name="address" label='Address' placeholder="Address" required=""/></Col>
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
                                                options={toLabelValArray(this.state.insCarriers)}
                                                multi='true'/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <label> </label>
                                        <Col sm={1}><Input bsStyle="primary" type="submit" value="Add Location"/></Col>
                                    </Row>
                                    <Row>

                                        <Table className="table table-striped table-condensed" columns={[
                                            { key: "address", label: "Address"},
                                            { key: "city", label: "City"},
                                            { key: "state", label: "State"},
                                            { key: "zip", label: "Zip"},
                                            { key: "phone", label: "Phone"}
                                        ]}

                                            data={this.state.locations}>
                                        </Table>
                                    </Row>
                                </Grid>
                            </form>


                        </TabPane>
                    </TabbedArea>

                </div>
                <div className="modal-footer">
                    <ButtonToolbar>
                        <Input type="submit" form="doctorForm" name="Save" value="Save"/>
                        <Button onClick={this.props.onRequestHide}>Close</Button>
                    </ButtonToolbar>
                </div>
            </Modal>);
    }
});

module.exports = DoctorModal;