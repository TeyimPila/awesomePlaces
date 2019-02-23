import React, { Component } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { Navigation } from 'react-native-navigation'
import PlaceList from "../../components/PlaceList/PlaceList";

class FindPlaceScreen extends Component {
	static navigatorStyle = {
		navBarButtonColor: "orange"
	};

	state = {
		placesLoaded: false,
		removeAnim: new Animated.Value(1)
	};

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

	placesLoadedHandler = () => {

	};

	placesSearchHandler = () => {
		Animated.timing(this.state.removeAnim, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true
		}).start(() => {
			this.setState({
				placesLoaded: true
			});
			this.placesLoadedHandler();
		});
	};

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
		let content = (
			<Animated.View
				style={{
					opacity: this.state.removeAnim,
					transform: [
						{
							scale: this.state.removeAnim.interpolate({
								inputRange: [0, 1],
								outputRange: [12, 1]
							})
						}
					]
				}}>
				<TouchableOpacity onPress={this.placesSearchHandler}>
					<View style={styles.searchButton}>
						<Text style={styles.searchButtonText}>Find Places</Text>
					</View>
				</TouchableOpacity>
			</Animated.View>
		);
		if (this.state.placesLoaded) {
			content = (
				<PlaceList
					places={this.props.places}
					onItemSelected={this.itemSelectedHandler}
				/>
			);
		}
		return (
			<View style={this.state.placesLoaded ? null : styles.buttonContainer}>
				{content}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	searchButton: {
		borderColor: "orange",
		borderWidth: 3,
		borderRadius: 50,
		padding: 20
	},
	searchButtonText: {
		color: "orange",
		fontWeight: "bold",
		fontSize: 26
	}
});

const mapStateToProps = state => {
	return {
		places: state.places.places
	};
};

export default connect(mapStateToProps)(FindPlaceScreen);
