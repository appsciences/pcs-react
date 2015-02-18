var React = require('react/addons')
    , formUtils = require('../shared/form-utils')
    , Doctor = require('./doctor')
    , Location = require('./location')
    , InsCarriers = require('../insCarriers/ins-carriers')
    , Specialties = require('../specialties/specialties')
    , SalesPeople = require('../sales-person/sales-people');

var ReactBootstrap = require('react-bootstrap')
    , Input = ReactBootstrap.Input
    , Panel = ReactBootstrap.Panel
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

var OfficeHours = require('./office-hours-edit')

var toDelimitedIdString = function (parseObjCol) {
    return parseObjCol && parseObjCol.map(function (parseObj) {
        return parseObj.id;
    }).join(',');
};

var getWeekDayName= function(weekDayNumber, weekDayLength){

    var d = (new Date('January 25, 2014 09:00:00'));

    d.setDate(d.getDate() + weekDayNumber);

    return d.toLocaleDateString('en-US', {weekday: weekDayLength});
};

var DoctorModal = React.createClass({
    getInitialState: function() {

        var locations;
        if(this.props.doctor.isNew()){
           locations = [];
        } else {
            locations = this.props.doctor.get("locations") || [];

        }

        return {
            doctor: this.props.doctor,
            locations: this.toTableVals(locations),
            insCarriers: [],
            specialties: [],
            salesPeople: [],
            officeHours: [],
            officeHoursWeekDay: '1',
            location: {}
        };
    },



    toTableVals: function (parseObjCol) {
        return parseObjCol && parseObjCol.map(function (parseObj, index) {
                var obj = parseObj.toJSON();
                obj.deleteButton = (
                    <Button bsStyle="danger" value={index} onClick={this.removeLocation}>
                        <Glyphicon glyph="remove" />
                    </Button>
                );

                return obj;
            }.bind(this));
    },

//Modal scrolling fix
    componentWillUnmount: function () {
        if (document && document.body) {
            document.body.className = document.body.className.replace(/ ?modal-open/, '');
        }
    },

    componentDidMount: function() {
        //Modal scrolling fix

        if (document && document.body) {
            var orig = document.body.className;
            document.body.className = orig + (orig ? ' ' : '') + 'modal-open';
        }

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

        var row = formUtils.toNameValCollection(event.target);

        row.deleteButton = (
            <Button bsStyle="danger" value={this.state.locations.length} onClick={this.removeLocation}>
                <Glyphicon glyph="remove" />
            </Button>);

        if(this.state.doctor.isSpecialist){

            //copy office hours
            row.officeHours = this.state.officeHours.slice(0);

            var officeHoursList = row.officeHours.map(function(oh){
               return <li>{getWeekDayName(oh.weekDay, 'short')} {oh.startTime} - {oh.endTime}</li>
            });

            row.officeHoursList  = <ul>{officeHoursList}</ul>;
        }else{
            row.officeHours = [];
        }

        this.setState(
            {locations: this.state.locations.concat(row)}
        );
    },

    //TODO: Doesn't work
    removeLocation: function(event){
        this.setState(
            //JS splice does not return the array, using addons
            {
                locations: formUtils.removeItemAtIndex(this.state.locations, event.target.value)
            }
        );
    },

     addOfficeHours: function(event) {
        event.preventDefault();
        
        var row = formUtils.toNameValCollection(event.target);

        row.deleteButton = (
            <Button bsStyle="danger" value={this.state.officeHours.length -1} onClick={this.removeOfficeHours}>
                <Glyphicon glyph="remove" />
            </Button>);
        
        row.weekDayName = getWeekDayName(row.weekDay, 'short');

        this.setState({
            officeHours: this.state.officeHours.concat(row),
            officeHoursWeekDay: parseInt(this.state.officeHoursWeekDay) == 6 ? '0' : (parseInt(this.state.officeHoursWeekDay) + 1).toString()

        });
    },

    removeOfficeHours: function(event){
        this.setState(
            {officeHours: formUtils.removeItemAtIndex(this.state.officeHours, event.target.value)}
        );
    },

    save: function(event){
        event.preventDefault();

        var doc = this.props.doctor;


        var insCarrs = this.state.insCarriers;
        var specs = this.state.specialties;
        var sales = this.state.salesPeople;

        doc.unset("locations");

        this.state.locations.forEach(function(location){
            var parseLoc = new Location;

            location.insCarriers && location.insCarriers.split(',').forEach(function(id){
                parseLoc.add("insCarriers", insCarrs.get(id));
            });


            //TODO: Hack
            delete location.insCarriers;
            delete location.deleteButton;
            delete location.addLocation;
            delete location[""];
            delete location.officeHoursList;

            location.officeHours.forEach(function(oh){delete oh.deleteButton});

            parseLoc.set(location);

            doc.add("locations", parseLoc);
        });

        var docProps = formUtils.toNameValCollection(event.target);

        doc.unset("specialties");

        docProps.specialties && docProps.specialties.split(',').forEach(function(id){
            doc.add("specialties", specs.get(id));
        });

        delete docProps.specialties;

        doc.unset("salesPeople");
        docProps.salesPeople && docProps.salesPeople.split(',').forEach(function(id){
            doc.add("salesPeople", sales.get(id));
        });

        delete docProps.salesPeople;

        doc.set(docProps);

        doc.save().then(
            this.props.onRequestHide,
            function(err){
                err;
            }
        );
    },

    render: function() {
        //TODO: Doesn't work
        var doc = this.props.doctor;


        var title =[
            (doc.isNew() ? "New" : "Edit"),
            (doc.isSpecialist) ? "Specialist" : "Referring Doctor"
        ].join(" ");


        var specialtiesSelect = doc.isSpecialist && (
            <Col sm={6}>
                <label for="specialties">Specialties</label>
                <Select
                    id='specialties'
                    name='specialties'
                    options={formUtils.toLabelValArrayByName(this.state.specialties)}
                    value={formUtils.toIdArray(this.props.doctor.get("specialties"))}
                    multi={true}/>
            </Col>);


        var OfficeHoursControl = doc.isSpecialist && (
            <OfficeHours
                defaultWeekDay={this.state.officeHoursWeekDay}
                addOfficeHours={this.addOfficeHours}
                officeHours={this.state.officeHours}/>
        );

        return (
            <Modal {...this.props} title={title} bsSize="large">
                <div className="modal-body">
                    <TabbedArea defaultActiveKey={1}>
                        <TabPane eventKey={1} tab="Doctor Info">
                            <form id="doctorForm" onSubmit={this.save}>
                                <Grid>
                                    <Row>
                                        <Col sm={3}>
                                            <Input
                                                form="doctorForm"
                                                type="text"
                                                name="firstName"
                                                defaultValue={doc.get("firstName")}
                                                label='First Name'
                                                placeholder="First Name" />
                                        </Col>
                                        <Col sm={3}>
                                            <Input
                                                form="doctorForm"
                                                type="text"
                                                name="lastName"
                                                defaultValue={doc.get("lastName")}
                                                label='Last Name'
                                                placeholder="Last Name" />
                                        </Col>
                                        <Col sm={3}>
                                            <Input
                                                form="doctorForm"
                                                type="text"
                                                name="company"
                                                defaultValue={doc.get("company")}
                                                label='Company'
                                                placeholder="Company" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        {specialtiesSelect}
                                    </Row>
                                    <Row>
                                        <Col sm={6}>
                                            <label for="salesPeople">Sales People</label>
                                            <Select
                                                id='salesPeople'
                                                name='salesPeople'
                                                options={formUtils.toLabelValArrayByName(this.state.salesPeople)}
                                                defaultValue={formUtils.toIdArray(doc.get("salesPeople"))}
                                                multi={true}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6}>
                                            <Input
                                                type="textarea"
                                                form="doctorForm"
                                                name="notes"
                                                label='Notes'
                                                placeholder="Notes"
                                                defaultValue={doc.get("notes")}
                                            /></Col>
                                    </Row>
                                </Grid>
                            </form>
                        </TabPane>
                        <TabPane eventKey={2} tab="Locations">
                            <form id="locationForm" onSubmit={this.addLocation}>
                                <Grid>
                                    <Row>
                                        <Col sm={3}><Input type="text" name="address" label='Address' placeholder="Address" required=""/></Col>
                                        <Col sm={3}><Input type="text" name="city" label='City' placeholder="City" /></Col>
                                        <Col sm={1}><Input type="text" name="state" label='State' placeholder="State" /></Col>
                                        <Col sm={1}><Input type="text" name="zip" label='Zip' placeholder="Zip" /></Col>
                                    </Row>
                                    <Row>
                                        <Col sm={3}><Input type="text" name="phone" label='Phone' placeholder="Phone" /></Col>
                                        <Col sm={3}><Input type="text" name="email" label='Email' placeholder="Email" /></Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6}>
                                            <label for="insCarriers">Insurance</label>
                                            <Select
                                                id='insCarriers'
                                                name='insCarriers'
                                                options={formUtils.toLabelValArrayByName(this.state.insCarriers)}
                                                multi={true}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                    &nbsp;
                                    </Row>

                                </Grid>
                            </form>
                            {OfficeHoursControl}

                            <Button bsStyle="primary" form="locationForm" type="submit" name="addLocation" value="Add Location">Add Location</Button>

                            <Table
                                style={this.state.locations.length ? {} : {display: 'none'}}
                                className="table table-striped table-condensed"
                                columns={[
                                    { key: "deleteButton", label: ""},
                                    { key: "address", label: "Address"},
                                    { key: "city", label: "City"},
                                    { key: "state", label: "State"},
                                    { key: "zip", label: "Zip"},
                                    { key: "phone", label: "Phone"},
                                    { key: "officeHoursList", label: "Office Hours"}
                                ]}
                                data={this.state.locations}>
                            </Table>
                        </TabPane>
                    </TabbedArea>

                </div>
                <div className="modal-footer">
                    <ButtonToolbar>
                        <Button bsStyle="primary" type="submit" form="doctorForm" name="saveButton" value="Save">Save</Button>
                        <Button bsStyle="danger" onClick={this.props.onRequestHide} name="Cancel">Cancel</Button>
                    </ButtonToolbar>
                </div>
            </Modal>);
    }
});

module.exports = DoctorModal;