var React = require('react');

var ReactBootstrap = require('react-bootstrap')
    , Nav = ReactBootstrap.Nav
    , NavItem = ReactBootstrap.NavItem
    , Navbar = ReactBootstrap.Navbar
    , Glyphicon = ReactBootstrap.Glyphicon;


var Header =  React.createClass({
    render: function() {
        return (
            <Navbar>
                <Nav>
                    <NavItem
                        className="navbar-header navbar-brand"
                        href="#">
                        <Glyphicon glyph="tree-deciduous"/>&nbsp;Patient Concierge Services
                    </NavItem>
                    <NavItem
                        href="#">
                        Home
                    </NavItem>
                    <NavItem
                        href="#">
                        Administration
                    </NavItem>
                    <NavItem
                        href="#">
                        Sales
                    </NavItem>
                    <NavItem className="navbar-right">
                        Hello Leo
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
});

module.exports = Header;

