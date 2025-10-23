import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Camera, useCameraDevice, type PhotoFile } from 'react-native-vision-camera';
import type { Camera as CameraType } from 'react-native-vision-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TakeSelfieScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null); 
  const cameraRef = useRef<CameraType>(null); 

  const device = useCameraDevice('front'); 

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    try {
      const photo: PhotoFile = await cameraRef.current.takePhoto({ flash: 'off' });
      setPhotoUri('file://' + photo.path); 
      Alert.alert('Success', 'Selfie captured successfully!');
    } catch (error) {
      console.error('Photo Capture Error:', error);
      Alert.alert('Error', 'Failed to capture selfie.');
    }
  };

  const retakePhoto = () => {
    setPhotoUri(null);
  };

  const uploadPhoto = () => {
    Alert.alert('Uploaded!', 'Your selfie has been uploaded successfully!');
    // 🔥 You can upload photoUri to server/Firebase here
  };

  if (device == null || !hasPermission) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Family Member</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.stepCompleted}>
          <Text style={styles.stepText}>Scan Aadhaar</Text>
        </View>
        <View style={styles.stepActive}>
          <Text style={styles.stepText}>Take Selfie</Text>
        </View>
        <View style={styles.stepPending}>
          <Text style={styles.stepText}>Face Match</Text>
        </View>
      </View>

      {/* Camera or Preview */}
      <View style={styles.cameraContainer}>
        {!photoUri ? (
          <>
            <Camera
              ref={cameraRef}
              style={styles.camera}
              device={device}
              isActive={true}
              photo={true}
            />
            <View style={styles.focusCircle} />
            <Text style={styles.focusText}>Align your face inside the circle</Text>
          </>
        ) : (
          <>
            <Image source={{ uri: photoUri }} style={styles.previewImage} />
            <View style={styles.focusCircle} />
            <Text style={styles.focusText}>Preview</Text>
          </>
        )}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        {!photoUri ? (
          <>
            <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
              <MaterialIcons name="camera-alt" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.previewButtons}>
            <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
              <Text style={styles.retakeText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton} onPress={uploadPhoto}>
              <Text style={styles.uploadText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default TakeSelfieScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#111',
  },
  headerText: { color: '#fff', fontSize: 18, fontWeight: '600', marginLeft: 10 },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1c1c1c',
    paddingVertical: 10,
  },
  stepCompleted: { alignItems: 'center' },
  stepActive: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#00BFFF',
  },
  stepPending: { alignItems: 'center', opacity: 0.5 },
  stepText: { color: '#fff', fontSize: 12 },
  cameraContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: 'hidden',
  },
  previewImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  focusCircle: {
    position: 'absolute',
    width: 310,
    height: 310,
    borderRadius: 155,
    borderWidth: 2,
    borderColor: 'white',
  },
  focusText: {
    position: 'absolute',
    bottom: 100,
    color: '#fff',
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 14,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: '#00BFFF',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  skipText: { color: '#ccc', fontSize: 16 },
  previewButtons: { flexDirection: 'row', gap: 30 },
  retakeButton: {
    backgroundColor: '#555',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  uploadButton: {
    backgroundColor: '#00BFFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retakeText: { color: '#fff', fontSize: 16 },
  uploadText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: { color: '#fff', fontSize: 16 },
});
