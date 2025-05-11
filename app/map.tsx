import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const MapComponent = () => {
  const [region, setRegion] = useState({
    latitude: 13.067439,
    longitude: 80.237617,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null); // State for the selected marker
  const [modalVisible, setModalVisible] = useState(false); // State to toggle modal visibility

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get('http://192.168.12.217:5000/get_location_data');
        setMarkers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching marker data:', error);
      }
    };

    fetchMarkers();
  }, []);

  const onMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const onRegionChange = useCallback((newRegion) => {
    setRegion(newRegion);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChange}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            onPress={() => onMarkerPress(marker)} // Trigger modal on marker press
          />
        ))}
      </MapView>

      {/* Modal to show marker description */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedMarker?.title}</Text>
            <Text style={styles.modalDescription}>{selectedMarker?.description}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MapComponent;
