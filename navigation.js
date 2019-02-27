import { Navigation } from "react-native-navigation/lib/dist/index";


const navToAuth = () => {
	Navigation.setRoot({
		root: {
			stack: {
				children: [
					{
						component: {
							name: "awesome-places.AuthScreen",
							options: {
								topBar: {
									title: {
										text: 'Welcome'
									}
								}
							}
						}
					}
				],

			}
		}
	});

}

export default navToAuth