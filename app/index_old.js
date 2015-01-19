Parse.initialize("WqDGRd0E9ntpvRiU0OlDRYrEr19GflSzWrSzh5kZ", "hqQLu9cUbwFeIPcunmNnBK9VGKD10plbNFMaAgcp");

var InsCarrier = Parse.Object.extend("Specialty"),

    insCarrier = new Specialty();


var BSColTextInput = React.createClass({
    render: function() {
        if (!this.props.className){
            this.props.className = "form-control";
        }
        return (
                <BSCol width={this.props.bsColWidth}>
                    <label for={this.props.name}>{this.props.label}</label>
                    <input type="text" id={this.props.name} {...this.props}/>
                </BSCol>
        );
    }
});

var BSCol = React.createClass({
    render: function() {
        return (
            <div className={"col-sm-" + this.props.width}>
            {this.props.children}
            </div>
        );
    }
});


var BSForm = React.createClass({

    handleChange: function(event) {
        //this.setState({message: event.target.value});
        console.log(event);
    },
    handleSubmit: function(event) {
        alert(event.target[0].name);
    },
    render: function() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <fieldset>
                    <BSColTextInput name="name" placeholder="blya" bsColWidth="3" label="Email address" name="email"/>
                    <input className="form-control" type="submit"/>
                </fieldset>
            </form>
        );
    }
});


React.render(
    <BSForm/>,
    document.getElementById('form'));

