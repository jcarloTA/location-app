const common = require('../common/selectors').default('location');

export default {
    CurrentLocation: common.get('currentLocation'),
    listLocations: common.get('listLocations'),
    timeDesign: common.get('timeDesign'),
}