import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import locationSelectors from "../../state/location/selectors";
import "./FavoriteLocations.scss";
import {
	getMyFavoriteLocations,
	removeLocation,
} from "../../services/location.service";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import { ButtonBase } from "@material-ui/core";
import { setMylocations } from "../../state/location/actions";

function FavoriteLocations({ listLocations, setMylocations, timeDesign }: any) {
	React.useEffect(() => {
		getMylocaitons();
	}, []);

	async function getMylocaitons() {
		try {
			const res = await getMyFavoriteLocations();
			if (res && res.length > 0) {
				setMylocations(res);
			} else if (res.length == 0) {
				setMylocations(res);
			}
		} catch (err) {
		}
	}

	async function removeFavoriteLocation(location: any) {
		try {
			const res = await removeLocation(location);
			getMylocaitons();
		} catch (err) {
		}
	}

	return (
		<div className={"favoritelocations " + timeDesign}>
			<h2 className="favoritelocations__title">My favorite locations</h2>
			{listLocations.length == 0 ? (
				<p className="favoritelocations__nolocations">No saved locations</p>
			) : null}
			{listLocations.map((location: any) => (
				<div className="favoritelocations__item" key={location.name}>
					<ButtonBase className="favoritelocations__item-text-container">
						<h4 className="favoritelocations__item-text">{location.name}</h4>
					</ButtonBase>
					<Button
						className="favoritelocations__item-button"
						variant="contained"
						color="secondary"
						onClick={() => removeFavoriteLocation(location)}
						startIcon={<DeleteIcon />}
					>
						Delete
					</Button>
				</div>
			))}
		</div>
	);
}

const mapStateToProps = (state: any) => ({
	listLocations: locationSelectors.listLocations(state),
	timeDesign: locationSelectors.timeDesign(state),
});

const mapDispatchToProps = {
	setMylocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteLocations);
