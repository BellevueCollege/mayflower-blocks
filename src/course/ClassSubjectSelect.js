import React, { Component } from "react";

const { SelectControl } = wp.components;
const { Fragment } = wp.element;

class ClassSubjectSelect extends Component {
	constructor(props) {
		super(props);
		this.nodeRef = null;
		this.bindRef = this.bindRef.bind(this);
		this.state = {
			error: null,
			isLoaded: false,
			classList: []
		};
	}

	bindRef(node) {
		if (!node) {
			return;
		}
		this.nodeRef = node;
	}

	componentDidMount() {
		fetch("https://www2.bellevuecollege.edu/data/api/v1/subjects")
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					classList: result,
				});
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
        )
	}

	render() {
		const { error, isLoaded, classList } = this.state;
		const { attributes } = this.props;

		let selectSubjectOptions = [{label: 'Select Subject', value: 'select'}];

		if (typeof classList.subjects === 'object'){
			let subjects = classList.subjects;
			Object.keys(subjects).forEach(function(key) {
				selectSubjectOptions.push({label: subjects[key].subject, value: subjects[key].subject});
			});
		}

		return (
			<Fragment>
				<SelectControl
					label="Subject"
					value= { attributes.subject ? attributes.subject : 'select' }
					options= { selectSubjectOptions }
                    onChange = { (newClassSubject) => {this.props.onSubjectUpdate(newClassSubject) } }
				/>
			</Fragment>
		)
	}
}

export default ClassSubjectSelect;