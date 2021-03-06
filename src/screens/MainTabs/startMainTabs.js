import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


const startTabs = () => {

	Promise.all([
		Icon.getImageSource("md-map", 30),
		Icon.getImageSource("ios-share-alt", 30),
		Icon.getImageSource("ios-menu", 30)
	]).then(imageSources => {

		Navigation.setRoot({
			root: {
				sideMenu: {
					left: {
						stack: {
							children: [
								{
									component: {
										name: "awesome-places.SideDrawer",
										options: {
											topBar: {
												title: {
													text: "Side Menu"
												},
											}
										}
									}
								}
							]
						}

					},
					center: {
						bottomTabs: {
							children: [
								{
									stack: {
										children: [
											{
												component: {
													name: 'awesome-places.FindPlaceScreen',
													options: {
														topBar: {
															title: {
																text: "Find Place"
															},
															leftButtons: [
																{
																	icon: imageSources[2],
																	title: "Menu",
																	id: "sideDrawerToggle"
																}
															]
														}
													}
												}
											}
										],
										options: {
											bottomTab: {
												text: 'Find Places',
												icon: imageSources[0],
												testID: 'SECOND_TAB_BAR_BUTTON'
											}
										}
									}

								},
								{
									stack: {
										children: [
											{
												component: {
													name: 'awesome-places.SharePlaceScreen',
													options: {
														topBar: {
															title: {
																text: "Share Place"
															},
															leftButtons: [
																{
																	icon: imageSources[2],
																	title: "Menu",
																	id: "sideDrawerToggle"
																}
															]

														}
													}
												}
											}
										],
										options: {
											bottomTab: {
												text: 'Share Place',
												icon: imageSources[1],
												testID: 'SECOND_TAB_BAR_BUTTON'
											}
										}
									}

								},
							],
						},
					}
				},

			}
		});
	});
};

export default startTabs;