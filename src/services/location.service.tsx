import {
	apiWeaterKey,
	apiWeaterUrl,
	localStorageKey,
} from "../library/constants";
import axios from "axios";

export async function getCurrentTempLocation(citiName: string) {
	try {
		const res = await axios.get(`${apiWeaterUrl}/weather`, {
			params: { q: citiName, appid: apiWeaterKey, units: "metric" },
		});
		if (res.status == 200 && res.data) {
			return res.data;
		} else {
			return null;
		}
	} catch (err) {
		return null;
	}
}

export async function getCurrentLocationByCoord(lat: number, lon: number) {
	try {
		const res = await axios.get(`${apiWeaterUrl}/weather`, {
			params: { lat: lat, lon: lon, appid: apiWeaterKey, units: "metric" },
		});
		if (res.status == 200 && res.data) {
			return res.data;
		} else {
			return null;
		}
	} catch (err) {
		return null;
	}
}

export async function getMyFavoriteLocations() {
	const list: any = localStorage.getItem(localStorageKey);
	return JSON.parse(list);
}

export async function addFavoriteLocation(location: any) {
    let listLocations = await getMyFavoriteLocations();
    if(!listLocations || listLocations.length == 0) {
        listLocations = [location];
        localStorage.setItem(localStorageKey, JSON.stringify(listLocations));
        return 'SUCCESS'
    }

	if(listLocations.length == 3) {
		return 'LIMIT'
	}

    let existLocations = listLocations.some( (e:any) => e.name == location.name);
    if(existLocations) {
        return 'ERROR_EXISTS'
    }
    listLocations.push(location);
    localStorage.setItem(localStorageKey, JSON.stringify(listLocations));
    return 'SUCCESS'
	// const list: any = [];
}

export async function removeLocation(location:any) {
    let listLocations = await getMyFavoriteLocations();
	if(!listLocations || listLocations.length == 0) {
		return;
    }
	const newList = listLocations.filter((e:any) => e.name != location.name);
    localStorage.setItem(localStorageKey, JSON.stringify(newList));
    return 'SUCCESS'
}
