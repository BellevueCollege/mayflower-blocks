import React, { Component } from "react";

const { SelectControl } = wp.components;
const { Fragment } = wp.element;

class ClassItemSelect extends Component {
	constructor(props) {
		super(props);
		this.nodeRef = null;
		this.bindRef = this.bindRef.bind(this);
		this.state = {
			error: null,
			isLoaded: false,
			itemList: []
		};
	}

	bindRef(node) {
		if (!node) {
			return;
		}
		this.nodeRef = node;
	}

	handleItemFetch = () => {
		//if a subject exists, then fetch
		if (this.props.attributes.subject !== '') {
			fetch("https://www2.bellevuecollege.edu/data/api/v1/courses/" + this.props.attributes.subject)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						itemList: result
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
	}

	componentDidMount() {
		this.handleItemFetch();
	}

	componentDidUpdate(prevProps) { // if new props, then fetch
		if (this.props.attributes.subject !== prevProps.attributes.subject) {
		  this.handleItemFetch();
		}
	  }

	render() {
		const { error, isLoaded, itemList } = this.state;
		const { attributes } = this.props;

		let selectItemOptions = [{label: 'Select Course', value: 'select'}];

		if (typeof itemList.courses === 'object'){
			let items = itemList.courses;
			Object.keys(items).forEach(function(key) {
				selectItemOptions.push({label: items[key].courseId, value: items[key].courseNumber});
			});
		}

		return (
			<Fragment>
				<SelectControl
					label="Course"
					value= { attributes.item ? attributes.item : 'select' }
					options= { selectItemOptions }
					onChange = { (newClassItem) => this.props.onItemUpdate(newClassItem) }
				/>
			</Fragment>
		)
	}
}

export default ClassItemSelect;
