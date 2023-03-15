import React, { Component } from "react";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from "react-native";
import {FontAwesome} from "@expo/vector-icons";

export const WGMapView = (props) => {
  const [lastUpdate, setLastUpdate] = React.useState(Date.now());
  const [markers, setMarkers] = React.useState([]);

  function onRegionChange(region) {
    // Grab new information from the backend
    if (Date.now() - lastUpdate < 4000) return; // Only update every 4 seconds
    setLastUpdate(Date.now());
  }

  async function fetchData() {
    try {
      let response = await fetch(global.url + "restaurant/list")
      let json = await response.json();
      return json;
    } catch (error) {
      throw error;
    }
  }

  React.useEffect(() => {
    // Asynchronously query grabbing of markers
    fetchData().then((data) => setMarkers(data.restaurants)).catch((err) => console.log(err));
  }, [lastUpdate])

  return (
    <MapView style={styles.map} onRegionChange={onRegionChange}>
      <Marker key={1} coordinate={{latitude: 0, longitude: 0}} title={'test'}/>
      <MarkerComponent markers={markers} navigation={props.navigation}/>
    </MapView>
  );
};

class MarkerComponent extends Component {
  constructor(props) {
    super(props);
  }

  markerClick(importedMarker) {
    this.props.navigation.navigate('viewRestaurant2_screen', {restaurantId: importedMarker.id, backScreen: 'home_screen'})
  }

  renderMarkers() {
    return this.props.markers.map((importedMarker) => <Marker
        key = {importedMarker.id}
        title = {importedMarker.name}
        coordinate = {{ latitude: importedMarker.position.latitude, longitude: importedMarker.position.longitude }}
        description = {importedMarker.id}
        onPress = {() => this.markerClick(importedMarker)}
      >
        <FontAwesome
          name={'map-pin'}
          size={40}
          style={{color: '#f60000'}}
        ></FontAwesome>
      </Marker>
    )
  }

  render() {
    return (this.renderMarkers());
  }
}

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    width: '100%',
    height: '100%',
    zIndex: -1
  },
})