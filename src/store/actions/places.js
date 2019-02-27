import {
	SET_PLACES,
	REMOVE_PLACE,
	PLACE_ADDED,
	START_ADD_PLACE
} from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

export const startAddPlace = () => {
	return {
		type: START_ADD_PLACE
	};
};

export const addPlace = (placeName, location, image) => {
	return dispatch => {
		let authToken;
		dispatch(uiStartLoading());
		dispatch(authGetToken())
			.catch(() => {
				alert("No valid token found!");
			})
			.then(token => {
				authToken = token;
				return fetch(
					"https://us-central1-the-awesome-places.cloudfunctions.net/storeImage",
					{
						method: "POST",
						body: JSON.stringify({
							image: image.base64
						}),
						headers: {
							Authorization: "Bearer " + authToken
						}
					}
				);
			})
			.catch(err => {
				console.log(err);
				alert("Something went wrong, please try again!");
				dispatch(uiStopLoading());
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error();
				}
			})
			.then(parsedRes => {
				const placeData = {
					name: placeName,
					location: location,
					image: parsedRes.imageUrl,
					imagePath: parsedRes.imagePath
				};
				return fetch(
					"https://the-awesome-places.firebaseio.com/places.json?auth=" +
					authToken,
					{
						method: "POST",
						body: JSON.stringify(placeData)
					}
				);
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error();
				}
			})
			.then(parsedRes => {
				console.log(parsedRes);
				dispatch(uiStopLoading());
				dispatch(placeAdded());
			})
			.catch(err => {
				console.log(err);
				alert("Something went wrong, please try again!");
				dispatch(uiStopLoading());
			});
	};
};

export const placeAdded = () => {
	return {
		type: PLACE_ADDED
	};
};

export const getPlaces = () => {
	console.log("Getting places 1...");
	return dispatch => {
		console.log("Getting places 2...");
		dispatch(authGetToken())
			.then(token => {
				return fetch(
					"https://the-awesome-places.firebaseio.com/places.json?auth=" +
					token
				);
			})
			.catch(() => {
				console.log("Getting places 3...")
				alert("No valid token found!");
			})
			.then(res => {
				console.log("Getting places 4...")
				if (res.ok) {
					return res.json();
				} else {
					throw new Error();
				}
			})
			.then(parsedRes => {
				console.log("Getting places 5...")
				const places = [];
				for (let key in parsedRes) {
					console.log("Getting places 6...")
					places.push({
						...parsedRes[key],
						image: {
							uri: parsedRes[key].image
						},
						key: key
					});
				}
				dispatch(setPlaces(places));
			})
			.catch(err => {
				alert("Something went wrong, sorry :/");
				console.log(err);
			});
	};
};

export const setPlaces = places => {
	return {
		type: SET_PLACES,
		places: places
	};
};

export const deletePlace = key => {
	return dispatch => {
		dispatch(authGetToken())
			.catch(() => {
				alert("No valid token found!");
			})
			.then(token => {
				dispatch(removePlace(key));
				return fetch(
					"https://the-awesome-places.firebaseio.com/places/" +
					key +
					".json?auth=" +
					token,
					{
						method: "DELETE"
					}
				);
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error();
				}
			})
			.then(parsedRes => {
				console.log("Done!");
			})
			.catch(err => {
				alert("Something went wrong, sorry :/");
				console.log(err);
			});
	};
};

export const removePlace = key => {
	return {
		type: REMOVE_PLACE,
		key: key
	};
};
