var React = require('react');
//var Parse = require('parse').Parse;

Parse.initialize("E4GxnmgjwPpfkQr2s4LsWro3sFqaTpSlf8ZKAkYM", "nOD0LstxpwU7i9K2HQRvKl3dgNBEjoM7OrnRRFOd");

var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Route = Router.Route;

var ReactBootstrap = require('react-bootstrap')
    , Nav = ReactBootstrap.Nav
    , Grid = ReactBootstrap.Grid
    , Row = ReactBootstrap.Row
    , Col = ReactBootstrap.Col
    , Glyphicon = ReactBootstrap.Glyphicon;

var ReactRouterBootstrap = require('react-router-bootstrap')
    , NavItemLink = ReactRouterBootstrap.NavItemLink
    , ButtonLink = ReactRouterBootstrap.ButtonLink;


var Header = require("./components/navigation/header");

var Dashboard = require("./components/dashboard/dashboard");

var PatientList = require("./components/patients/patient-list");

var DoctorList = require("./components/doctors/doctor-list");

var App = React.createClass({
    render: function() {
        return (
            <div class="container-fluid">
                <Header/>
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
                <p class="text-center text-muted">© 2014 Patient Concierge Services. All Rights Reserved.</p>
            </div>

        );
    }
});

var routes = (
    <Route handler={App} path="/">
        <Route name="dashboard" path="dashboard" handler={Dashboard} />
        <Route name="patients" path="patients" handler={PatientList} />
        <Route name="doctors" path="doctors" handler={DoctorList} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});