export const genericReducer =
	(lookup: any, initialState: any) =>
	(state = initialState, { type, payload }:any) =>
		(lookup[type] && lookup[type](state, payload)) || state;

export const reduceKeyFromPayloadKey =
	(key: any, def: any) => (state: any, payload: any) => ({
		...state,
		[key]: payload[key] || def,
	});

export const reduceKeyFromSingleParam = (key:any, def:any = null) => (state:any, payload:any) => ({
	...state,
	[key]: payload || def,
});

export const reducePushToKeyFromSingleParam =
	(key:any, def = []) =>
	(state:any, payload:any) => ({
		...state,
		[key]: [...state[key], ...(payload ? [payload] : def)],
	});
