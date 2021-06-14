import React from "react";
import "./Location.scss";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import locationSelectors from "../../state/location/selectors";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
	addFavoriteLocation,
	getCurrentLocationByCoord,
	getCurrentTempLocation,
} from "../../services/location.service";
import { setCurrentLocation } from "../../state/location/actions";
import { getMyFavoriteLocations } from "../../services/location.service";
import { setMylocations } from "../../state/location/actions";

function Location({
	currentLocation,
	listLocations,
	setCurrentLocation,
	setMylocations,
	timeDesign
}: {
	currentLocation: any;
	listLocations: any;
	setCurrentLocation: any;
	setMylocations: any;
	timeDesign: any;
}) {
	const [loading, setLoading] = React.useState(false);
	const [errorExists, setErrorExist] = React.useState(false);
	const [error, setError] = React.useState("");
	React.useEffect(() => {
		getCurrentLocation();
	}, []);

	async function getCurrentLocation() {
		try {
			if (!navigator.geolocation) {
				console.warn("geolocation no aviable");
			} else {
				navigator.geolocation.getCurrentPosition(
					async (position) => {
						const res = await getCurrentLocationByCoord(
							position.coords.latitude,
							position.coords.longitude
						);
						if (res) {
							setCurrentLocation(res);
						}
					},
					() => {}
				);
			}
			setLoading(true);
		} catch (err) {
			setLoading(false);
		}
	}

	async function getMylocaitons() {
		try {
			const res = await getMyFavoriteLocations();
			if (res && res.length > 0) {
				setMylocations(res);
			}
		} catch (err) {
		}
	}

	async function addLocation() {
		try {
			setErrorExist(false);
			const res = await addFavoriteLocation(currentLocation);
			if (res == "ERROR_EXISTS") {
				setError("location has already saved");
				setErrorExist(true);
			} else if (res == "LIMIT") {
				setError("the maximum of saved locations is 3");
				setErrorExist(true);
			}
			getMylocaitons();
		} catch (err) {
		}
	}

	if (!currentLocation) {
		return (
			<div>
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className={"location " + timeDesign}>
			<div className="location__title">
				<h2 className="location__title-text">{currentLocation.name}</h2>
			</div>
			<div className="location__degress">
				<p className="location__degress-title">{currentLocation.main.temp}°C</p>
				<p className="location__degress-descripcion">
					{currentLocation.main.temp_min}°C / {currentLocation.main.temp_max}°C
				</p>
				<p className="location__degress-percipitation">
					Precipitation: {currentLocation.clouds.all}%
				</p>
				<p className="location__degress-humidity">
					Humidity: {currentLocation.main.humidity}%
				</p>
				<p className="location__degress-wind">
					Wind: {currentLocation.wind.speed}mph
				</p>
			</div>

			<div className="location__button">
				<Button variant="contained" color="primary" onClick={addLocation}>
					Add to my favorite location
				</Button>
				{errorExists ? <p className="location__alreadysaved">{error}</p> : null}
			</div>
		</div>
	);
}

const mapStateToProps = (state: any) => ({
	currentLocation: locationSelectors.CurrentLocation(state),
	listLocations: locationSelectors.listLocations(state),
	timeDesign: locationSelectors.timeDesign(state),
});

const mapDispatchToProps = {
	setCurrentLocation,
	setMylocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
