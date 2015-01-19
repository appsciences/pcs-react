exports.AdminMenu = React.createClass({
    render: function() {
        return (
            <div>
                <Nav>
                    <NavItemLink
                        to="destination"
                        someparam="hello">
                        <span class="glyphicon glyphicon-home"></span>&nbsp;Dashboard
                    </NavItemLink>
                    <NavItemLink
                        to="destination"
                        someparam="hello">
                        <span class="glyphicon glyphicon-user"></span>&nbsp;Patients
                    </NavItemLink>
                    <NavItemLink
                        to="destination"
                        someparam="hello">
                        <span class="glyphicon glyphicon-home"></span>&nbsp;Doctors
                    </NavItemLink>
                </Nav>
                <br />
                <RouteHandler />
            </div>
        );
    }
});
