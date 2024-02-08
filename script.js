require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search",
  "esri/widgets/Legend", // Add Legend widget
  "esri/layers/FeatureLayer",
  "esri/symbols/PictureMarkerSymbol"
], (Map, MapView, Search, Legend, FeatureLayer, PictureMarkerSymbol) => {
  const map = new Map({
    basemap: "streets"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-98.5795, 39.8283], // Center of the USA
    zoom: 4
  });

  // Add the Search widget for counties
  const countySearchWidget = new Search({
    view: view
  });
  view.ui.add(countySearchWidget, {
    position: "top-right"
  });

  // Feature Layer for roads with pop-up
  const featureLayer_1 = new FeatureLayer({
    url: "https://services2.arcgis.com/FiaPA4ga0iQKduv3/arcgis/rest/services/Transportation_v1/FeatureServer/2",
    popupTemplate: {
      title: "{Name}",
      content: [{
        type: "fields",
        fieldInfos: [
          { fieldName: "NAME", label: "Road Name" },
          // ... add other fields as needed
        ]
      }]
    }
  });

  // Second road layer
  const featureLayer_2 = new FeatureLayer({
    url: "https://services2.arcgis.com/FiaPA4ga0iQKduv3/arcgis/rest/services/Transportation_v1/FeatureServer/0",
    popupTemplate: {
      title: "{Name}",
      content: [{
        type: "fields",
        fieldInfos: [
          { fieldName: "NAME", label: "Road Name" },
          // ... add other fields as needed
        ]
      }]
    }
  });

  // Counties Layer
  const featureLayer_3 = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Counties_Generalized_Boundaries/FeatureServer/0",
    popupTemplate: {
      title: "{Name}",
      content: [{
        type: "fields",
        fieldInfos: [
          { fieldName: "NAME", label: "County Name" },
          { fieldName: "STATE_NAME", label: "State Name" },
          { fieldName: "POPULATION", label: "Pop20" },
          { fieldName: "SQMI", label: "Area (SqMile)" }
        ]
      }]
    }
  });

  // Red heart symbol for hospitals
  const hospitalSymbol = new PictureMarkerSymbol({
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwPB2yzqbJOhEXN1pF3LUbqyBd5nYbNTcjuX5fsl4G4_POy7bxXVLp5kmTHVHNbqlpvWs&usqp=CAU",
    width: "10px",
    height: "10px"
  });

  // Hospitals layer with custom symbol and pop-up
  const featureLayer_4 = new FeatureLayer({
    url: "https://services3.arcgis.com/YvCkaUgvu4lV73yk/arcgis/rest/services/Hospitals/FeatureServer",
    renderer: {
      type: "simple",
      symbol: hospitalSymbol
    },
    popupTemplate: {
      title: "{NAME}",
      content: [{
        type: "fields",
        fieldInfos: [
          { fieldName: "ADDRESS", label: "Address" },
          { fieldName: "CITY", label: "City" },
          { fieldName: "STATE", label: "State" },
          { fieldName: "ZIP", label: "Zip Code" },
          { fieldName: "TELEPHONE", label: "Telephone" },
        ]
      }]
    }
  });

// Add legend widget
const legend = new Legend({
  view: view,
  container: "legendDiv"
});

// Add legend widget to the UI at the bottom right
view.ui.add(legend, "bottom-right");

  // Add layers to the map
  map.add(featureLayer_1);
  map.add(featureLayer_2);
  map.add(featureLayer_3);
  map.add(featureLayer_4);
});
