import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Navigation } from 'react-native-navigation'
import PlaceList from "../../components/PlaceList/PlaceList";

class FindPlaceScreen extends Component {
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


	itemSelectedHandler = key => {
		const selPlace = this.props.places.find(place => {
			return place.key === key;
		});

		Navigation.push(this.props.componentId, {
			component: {
				name: "awesome-places.PlaceDetailScreen",
				title: selPlace.name,
				passProps: {
					selectedPlace: selPlace
				}
			}
		});
	};

	render() {
		return (
			<View>
				<PlaceList
					places={this.props.places}
					onItemSelected={this.itemSelectedHandler}
				/>
			</View>
		);
	}
}

const mapStateToProps = state => {
	console.log("this is the state", state);
	return {
		places: state.places.places
	};
};

export default connect(mapStateToProps)(FindPlaceScreen);
