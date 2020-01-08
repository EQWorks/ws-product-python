
const events = 'events';
const impressions = 'impressions';
const clicks = 'clicks';
const revenue = 'revenue';

export function createMarkerData (selectedCategory, eventsData, statsData, poiData, startDate, endDate) {
    console.log("Selected Category:", selectedCategory);
    var currDataset = selectedCategory == events ? eventsData:statsData;
    var sortedPoiInfo = sortPoiInfo(poiData);
    var filteredDates = filterDates(currDataset, startDate, endDate);

    console.log('currDataset:',currDataset);
    console.log('sortedPoiInfo:',sortedPoiInfo);
    console.log('filteredDataset:',filteredDates);

    //Compile the data
    var markerData = {}
    var dataCategory = selectedCategory;
    var currId;
    var currMarker;

    for (var i = 0; i < filteredDates.length; i++) {
      currId = filteredDates[i]['poi_id'];
      currMarker = sortedPoiInfo[currId];

      if (currMarker['name'] in markerData){
        markerData[currMarker['name']]['count'] += filteredDates[i][dataCategory];
      } else {
        markerData[currMarker['name']] = { 'position':currMarker['position'] , 'count':filteredDates[i][dataCategory] };
      }
    }

    return markerData;
  }

function filterDates (oldDataset, startDate, endDate) {
    var newDataset = [];
    var date = '';
    var startDate = null;
    var endDate = null;
  
    if (isValidDate(startDate)) {
      startDate = new Date(startDate);
    }
  
    if (isValidDate(endDate)) {
      endDate = new Date(endDate);
    }
  
    var filterType = null;
    if (startDate != null && endDate != null){
      filterType = "interval";
    } else if (endDate != null){
      filterType = "before";
    } else if (startDate != null){
      filterType = "after";
    } else {
      filterType = "all"
    }
  
    //Filter out dates that are outside of the dataset
    for (var i = 0; i < oldDataset.length; i++) {
      date = new Date(oldDataset[i].date.replace(/-/g,'/'));
  
      if (filterType === "interval") {
        if (date >= startDate && date <= endDate) {
          newDataset.push(oldDataset[i]);
        }
      } else if (filterType === "before") {
        if (date <= endDate) {
          newDataset.push(oldDataset[i]);
        }
      } else if (filterType === "after") {
        if (date >= startDate) {
          newDataset.push(oldDataset[i]);
        }
      } else {
        newDataset.push(oldDataset[i]);
      }
    }
  
    return newDataset
  }
  
    function sortPoiInfo (poiData) {
    var sortedPoiInfo = {};

    //Faster to write the var name
    var poiData = poiData;

    for (var i = 0; i < poiData.length; i++) {
        var poiId = poiData[i]['poi_id'];
        var lat = poiData[i]['lat'];
        var lng = poiData[i]['lon'];
        var name = poiData[i]['name'];

        sortedPoiInfo[poiId] = { 'position':{ 'lat':lat , 'lng':lng }, 'name':name };
    }

    return sortedPoiInfo;
    }

function isValidDate(item) {
    return !isNaN(Date.parse(item)) && item.length >= 4;
    }