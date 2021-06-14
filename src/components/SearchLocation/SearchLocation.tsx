import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./SearchLocation.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getCurrentTempLocation } from "../../services/location.service";
import { setCurrentLocation } from "../../state/location/actions";
import { connect } from "react-redux";
import locationSelectors from "../../state/location/selectors";

function SearchLocation({ setCurrentLocation, timeDesign }: any) {
	const [textField, setTextField] = React.useState("");
	const [items, setItems] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [notResults, setNotResults] = React.useState(false);

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTextField(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			setNotResults(false);
			setLoading(true);
			const res = await getCurrentTempLocation(textField);
			if (res) {
				setCurrentLocation(res);
			} else {
				setNotResults(true);
			}
			setLoading(false);
		} catch (err) {
			setLoading(false);
		}
	};

	return (
		<div className={"searchlocation " + timeDesign}>
			<form
				noValidate
				autoComplete="off"
				className="searchlocation__form"
				onSubmit={handleSubmit}
			>
				<TextField
					id="standard-basic"
					//  error
					value={textField}
					onChange={onChangeInput}
					variant="filled"
					label="Search location"
					// helperText="Incorrect entry."
					className="searchlocation__form-input"
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="searchlocation__form-button"
				>
					Search
				</Button>
			</form>
			{loading ? (
				<div className="searchlocation__loader">
					<CircularProgress />
				</div>
			) : null}
			{notResults ? (
				<div className="searchlocation__notresults">
					<p>No results found</p>
				</div>
			) : null}
		</div>
	);
}

const mapStateToProps = (state: any) => ({
	timeDesign: locationSelectors.timeDesign(state),
});

const mapDispatchToProps = {
	setCurrentLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchLocation);
