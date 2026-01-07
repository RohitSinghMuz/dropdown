// import React, { useEffect, useState, useRef, useMemo } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Image,
//   Dimensions,
//   LayoutAnimation,
// } from 'react-native';
// import {
//   Camera,
//   useCameraDevices,
//   type PhotoFile,
// } from 'react-native-vision-camera';
// import type { Camera as CameraType } from 'react-native-vision-camera';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// const CAMERA_WIDTH = SCREEN_WIDTH * 1.2;
// const CAMERA_HEIGHT = SCREEN_WIDTH * 1.6;

// const TakeSelfieScreen = () => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const [photoUri, setPhotoUri] = useState<string | null>(null);
//   const [isCameraReady, setIsCameraReady] = useState(true);
//   const cameraRef = useRef<CameraType>(null);

//   const devices = useCameraDevices();
//   const device = useMemo(
//     () => devices.find(d => d.position === 'front'),
//     [devices],
//   );

//   useEffect(() => {
//     (async () => {
//       const permission = await Camera.requestCameraPermission();
//       setHasPermission(permission === 'granted');
//     })();
//   }, []);

//   const takePhoto = async () => {
//     if (!cameraRef.current) return;
//     try {
//       const photo: PhotoFile = await cameraRef.current.takePhoto({
//         flash: 'off',
//       });
//       LayoutAnimation.easeInEaseOut();
//       setPhotoUri('file://' + photo.path);
//       setIsCameraReady(false);
//     } catch (error) {
//       console.error('Photo Capture Error:', error);
//       Alert.alert('Error', 'Failed to capture selfie.');
//     }
//   };

//   const retakePhoto = () => {
//     LayoutAnimation.easeInEaseOut();
//     setPhotoUri(null);
//     setIsCameraReady(false);
//     setTimeout(() => setIsCameraReady(true), 300);
//   };

//   const uploadPhoto = () => {
//     Alert.alert('Uploaded!', 'Your selfie has been uploaded successfully!');
   
//   };

//   if (!device || !hasPermission) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Loading Camera...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <MaterialIcons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Add Family Member</Text>
//       </View>

//       {/* Progress Bar */}
//       <View style={styles.progressContainer}>
//         <View style={styles.stepCompleted}>
//           <Text style={styles.stepText}>Scan Aadhaar</Text>
//         </View>
//         <View style={styles.stepActive}>
//           <Text style={styles.stepText}>Take Selfie</Text>
//         </View>
//         <View style={styles.stepPending}>
//           <Text style={styles.stepText}>Face Match</Text>
//         </View>
//       </View>

//       {/* Camera / Preview */}
//       <View style={styles.cameraContainer}>
//         {photoUri ? (
//           <Image source={{ uri: photoUri }} style={styles.previewImage} />
//         ) : (
//           isCameraReady && (
//             <Camera
//               ref={cameraRef}
//               style={styles.camera}
//               device={device}
//               isActive={true}
//               photo={true}
//             />
//           )
//         )}
//       </View>

//       {/* Bottom Buttons */}
//       <View style={styles.bottomContainer}>
//         {photoUri ? (
//           <View style={styles.previewButtons}>
//             <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
//               <Text style={styles.retakeText}>Retake</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.uploadButton} onPress={uploadPhoto}>
//               <Text style={styles.uploadText}>Continue</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <>
//             <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
//               <MaterialIcons name="camera-alt" size={30} color="#fff" />
//             </TouchableOpacity>
//             <View style={styles.captureRow}>
//               <TouchableOpacity>
//                 <Text style={styles.skipText}>Skip</Text>
//               </TouchableOpacity>
//             </View>
//           </>
//         )}
//       </View>
//     </View>
//   );
// };

// export default TakeSelfieScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000', paddingVertical: 25 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     backgroundColor: '#111',
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//     marginLeft: 10,
//   },
//   progressContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#1c1c1c',
//     // paddingVertical: 30,
//     height: 80,
//   },
//   stepCompleted: { alignItems: 'center' },
//   stepActive: {
//     alignItems: 'center',
//     borderBottomWidth: 2,
//     borderBottomColor: '#00BFFF',
//   },
//   stepPending: { alignItems: 'center', opacity: 0.5 },
//   stepText: { color: '#fff', fontSize: 12 },
//   cameraContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   focusText: {
//     position: 'absolute',
//     bottom: 50,
//     color: '#fff',
//     backgroundColor: '#333',
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 10,
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   bottomContainer: { alignItems: 'center', paddingVertical: 20 },
//   captureRow: {
//     width: '100%',
//     height: 100,
//   },
//   captureButton: {
//     position: 'absolute',
//     marginTop: -10,
//     width: 50,
//     height: 50,
//     backgroundColor: '#00BFFF',
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   skipText: { color: '#ccc', fontSize: 16, paddingLeft: 320,marginTop:40 },
//   previewButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: 220,
//   },
//   retakeButton: {
//     backgroundColor: '#555',
//     paddingHorizontal: 30,
//     paddingVertical: 12,
//     borderRadius: 25,
//   },
//   uploadButton: {
//     backgroundColor: '#00BFFF',
//     paddingHorizontal: 30,
//     paddingVertical: 12,
//     borderRadius: 25,
//   },
//   retakeText: { color: '#fff', fontSize: 16 },
//   uploadText: { color: '#fff', fontSize: 16, fontWeight: '600' },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   loadingText: { color: '#fff', fontSize: 16 },
//   camera: {
//     width: CAMERA_WIDTH,
//     height: CAMERA_HEIGHT,
//     borderRadius: CAMERA_WIDTH / 2,
//     overflow: 'hidden',
//   },
//   previewImage: {
//     width: CAMERA_WIDTH,
//     height: CAMERA_HEIGHT,
//     resizeMode: 'cover',
//   },
//   focusCircle: {
//     position: 'absolute',
//     width: CAMERA_WIDTH + 10,
//     height: CAMERA_HEIGHT + 10,
//   },
// });



import React from 'react'
import { Text } from 'react-native'

function outerFunction() {
  let counter = 0;
  let message = "Hello from closure";

  function innerFunction() {
    counter++;
    console.log(counter);
  }

  return innerFunction;
}
const myCounter = outerFunction();
console.dir(myCounter);



  
  return (
    <>
    <Text>Hello</Text>
    </>
  )
}
export default App

