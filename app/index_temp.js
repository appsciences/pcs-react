var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Route = Router.Route;

var ReactBootstrap = require('react-bootstrap')
    , Nav = ReactBootstrap.Nav;

var ReactRouterBootstrap = require('react-router-bootstrap')
    , NavItemLink = ReactRouterBootstrap.NavItemLink
    , ButtonLink = ReactRouterBootstrap.ButtonLink;



var MainMenu = require("components/navigation/main-menu").MainMenu;

var AdminMenu = require("components/navigation/admin-menu").AdminMenu;

var AdminMenu = require("components/doctors/list").DoctorList;


var routes = (
    <Route handler={MainMenu} path="/">
        <Route name="dashboard" path="dashboard" handler={Dashboard} />
        <Route name="patients" path="patients" handler={PatientList} />
        <Route name="doctors" path="doctors" handler={DoctorList} />
    </Route>
);

Router.run(mainRoutes, function (Handler) {
    React.render(<Handler/>, document.getElementById("menu"));
});

