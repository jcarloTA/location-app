import getWithPath from 'lodash/get';

const get = (base:any, base2: any = null) => (key:any, def:any = null) => (state: any) => {
    return getWithPath(state, [base, key], def);
};

const lookup = (base : any) => (key:any, attr:any, def = null) => (state:any) => {
    const lookupParent:any = get(state, [base,key]);
    return lookupParent && (lookupParent[attr] || def) || def;
}; 


export default (basePath:any) => ({
    get: get(basePath),
    lookup: lookup(basePath)
})