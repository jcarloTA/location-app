import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { ThemeProvider } from "@material-ui/styles";
import SearchLocation from "./components/SearchLocation/SearchLocation";
import Location from "./components/Location/Location";
import FavoriteLocations from "./components/FavoriteLocations/FavoriteLocations";
import { createMuiTheme } from "@material-ui/core/styles";
import Store from "./Store";
import { Provider, connect } from "react-redux";

const theme = createMuiTheme({
	palette: {
		primary: {
			// Purple and green play nicely together.
			main: "#6fbd93",
		},
		secondary: {
			// This is green.A700 as hex.
			main: "#d20000",
		},
		
	},
});

function App() {
	return (
		<Provider store={Store}>
			<ThemeProvider theme={theme}>
				<div className="App">
					<div className="search-loc">
						<SearchLocation />
						<Location />
					</div>
					<FavoriteLocations />
				</div>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
