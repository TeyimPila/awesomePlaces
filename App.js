import React from 'react'
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import AuthScreen from "./src/screens/Auth/AuthScreen";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import configureStore from "./src/store/configureStore";

import navToAuth from './navigation'

const store = configureStore();


// Register Screens
Navigation.registerComponent(
	"awesome-places.AuthScreen",
	() => (props) => (
		<Provider store={store}>
			<AuthScreen {...props}/>
		</Provider>
	),
	() => AuthScreen
);

Navigation.registerComponent(
	"awesome-places.SharePlaceScreen",
	() => (props) => (
		<Provider store={store}>
			<SharePlaceScreen {...props}/>
		</Provider>
	),
	() => SharePlaceScreen
);
Navigation.registerComponent(
	"awesome-places.FindPlaceScreen",
	() => (props) => (
		<Provider store={store}>
			<FindPlaceScreen {...props}/>
		</Provider>
	),
	() => FindPlaceScreen,
);
Navigation.registerComponent(
	"awesome-places.PlaceDetailScreen",
	() => (props) => (
		<Provider store={store}>
			<PlaceDetailScreen {...props}/>
		</Provider>
	),
	() => PlaceDetailScreen,
);
Navigation.registerComponent(
	"awesome-places.SideDrawer",
	() => (props) => (
		<Provider store={store}>
			<SideDrawer {...props}/>
		</Provider>
	),
	() => SideDrawer
);

// Start an App
Navigation.events().registerAppLaunchedListener(
	navToAuth
);

// export default navToAuth
