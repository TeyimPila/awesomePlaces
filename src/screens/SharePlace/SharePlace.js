import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store/actions/index';
import { Navigation } from "react-native-navigation/lib/dist/index";

class SharePlaceScreen extends Component {
	constructor(props) {
		super(props);

		this.isSideDrawerVisible = false;
		Navigation.events().bindComponent(this);
	}


	navigationButtonPressed({ buttonId }) {

		if (buttonId === "sideDrawerToggle") {

			this.isSideDrawerVisible = !this.isSideDrawerVisible;

			Navigation.mergeOptions(this.props.componentId, {
				sideMenu: {
					left: {
						visible: this.isSideDrawerVisible,
					}
				}
			});
		}
	}


	// onNavigatorEvent = event => {
	// 	if (event.type === "NavBarButtonPress") {
	// 		if (event.id === "sideDrawerToggle") {
	// 			this.props.navigator.toggleDrawer({
	// 				side: "left"
	// 			});
	// 		}
	// 	}
	// }

	placeAddedHandler = placeName => {
		this.props.onAddPlace(placeName);
	};

	render() {
		return (
			<View>
				{/*<Text>Share</Text>*/}
				<PlaceInput onPlaceAdded={this.placeAddedHandler}/>
			</View>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAddPlace: (placeName) => dispatch(addPlace(placeName))
	};
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);