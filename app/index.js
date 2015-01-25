var React = require('react');
//var Parse = require('parse').Parse;

Parse.initialize("E4GxnmgjwPpfkQr2s4LsWro3sFqaTpSlf8ZKAkYM", "nOD0LstxpwU7i9K2HQRvKl3dgNBEjoM7OrnRRFOd");

var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , DefaultRoute = Router.DefaultRoute
    , Route = Router.Route;

var ReactBootstrap = require('react-bootstrap')
    , Nav = ReactBootstrap.Nav
    , Navbar = ReactBootstrap.Navbar
    , Grid = ReactBootstrap.Grid
    , Row = ReactBootstrap.Row
    , Col = ReactBootstrap.Col
    , Glyphicon = ReactBootstrap.Glyphicon;

var ReactRouterBootstrap = require('react-router-bootstrap')
    , NavItemLink = ReactRouterBootstrap.NavItemLink
    , ButtonLink = ReactRouterBootstrap.ButtonLink;


var Header = require("./components/navigation/header");

var Dashboard = require("./components/dashboard/dashboard");

var AdminDashboard = require("./components/dashboard/admin-dashboard");

var PatientList = require("./components/patients/patient-list");

var DoctorList = require("./components/doctors/doctor-list");

var ApptList = require("./components/appointments/appointment-list");

var InsCarrierList = require("./components/insCarriers/ins-carrier-list");

var SpecialtyList = require("./components/specialties/specialty-list");

var OfficeHours = require("./components/doctors/office-hours-edit");

var App = React.createClass({

    render: function() {
        return (
            <div class="container-fluid">
                <Navbar>
                    <Nav>
                        <NavItemLink
                            className="navbar-header"
                            to="dashboard">
                            <Glyphicon glyph="tree-deciduous"/>&nbsp;Patient Concierge Services
                        </NavItemLink>
                        <NavItemLink
                            to="dashboard">
                            Home
                        </NavItemLink>
                        <NavItemLink
                            to="adminDashboard">
                            Administration
                        </NavItemLink>
                        <NavItemLink
                            to="sales">
                            Sales
                        </NavItemLink>
                    </Nav>
                </Navbar>
                <RouteHandler />
                <p className="text-center text-muted">© 2014 Patient Concierge Services. All Rights Reserved.</p>
            </div>

        );
    }
});


var MainArea = React.createClass({

    render: function () {
        return (
            <Grid>
                <Row>
                    <Col sm={3}>
                        <Nav>
                            <NavItemLink
                                to="dashboard"
                                someparam="hello">
                                <Glyphicon glyph="home" />&nbsp;Dashboard
                            </NavItemLink>
                        </Nav>
                        <Nav>
                            <NavItemLink
                                to="appointments"
                                someparam="hello">
                                <Glyphicon glyph="calendar" />&nbsp;Appointments
                            </NavItemLink>
                        </Nav>
                        <Nav>
                            <NavItemLink
                                to="patients"
                                someparam="hello">
                                <Glyphicon glyph="user" />&nbsp;Patients
                            </NavItemLink>
                        </Nav>
                        <Nav>
                            <NavItemLink
                                to="doctors"
                                someparam="hello">
                                <Glyphicon glyph="phone" />&nbsp;Doctors
                            </NavItemLink>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <RouteHandler />
                    </Col>
                </Row>
            </Grid>
        )
    }
});

var AdminArea = React.createClass({

    render: function () {
        return (
            <Grid>
                <Row>
                    <Col sm={3}>
                        <Nav>
                            <NavItemLink
                                to="insurance"
                                someparam="hello">
                                <Glyphicon glyph="user" />
                            &nbsp;Users
                            </NavItemLink>
                        </Nav>
                        <Nav>
                            <NavItemLink
                                to="specialties"
                                someparam="hello">
                                <Glyphicon glyph="th-list" />
                            &nbsp;Specialties
                            </NavItemLink>
                        </Nav>
                        <Nav>
                            <NavItemLink
                                to="insurance"
                                someparam="hello">
                                <Glyphicon glyph="th-list" />
                            &nbsp;Insurance
                            </NavItemLink>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <RouteHandler />
                    </Col>
                </Row>
            </Grid>
        )
    }
});

var routes = (
    <Route handler={App} path="/">
        <DefaultRoute handler={MainArea} />
        <Route name="main" path="main" handler={MainArea}>
            <DefaultRoute handler={Dashboard} />
            <Route name="dashboard" path="dashboard" handler={Dashboard} />
            <Route name="appointments" path="appointments" handler={ApptList} />
            <Route name="patients" path="patients" handler={PatientList} />
            <Route name="doctors" path="doctors" handler={DoctorList} />
            <Route name="test" path="test" handler={OfficeHours} />
        </Route>
        <Route path="admin" name="admin" handler={AdminArea} >
            <DefaultRoute handler={AdminDashboard} />
            <Route name="adminDashboard" path="dashboard" handler={AdminDashboard} />
            <Route name="insurance" path="insurance" handler={InsCarrierList} />
            <Route name="specialties" path="specialties" handler={SpecialtyList} />
        </Route>
        <Route path="sales" name="sales" handler={MainArea} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});