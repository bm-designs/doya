import ReactDOM from 'react-dom';
import React, {Component} from 'react';
module.exports = {
	getDOM: function() {
		return (<p>Hello</p>
				<
			)
	}
}
class Email extends Component {
	constructor(props) {
		super(props)
		fetch('/receipts',{method:"GET"}).then(response => {
			console.log(response.body)
		})
		this.state = {

		}
		this.ReactDOM = ReactDOM.bind(this);
		this.DOM = this.DOM.bind(this)
	}
	componentDidMount(){

	}
	DOM() {
		return (
			<p>Hello</p>
			)
	}

}
ReactDOM.render(this.DOM, document.getElementById("app"))