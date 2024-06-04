import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';

const TakePic = () => {
    let camera = useRef(null);
    const [startCamera, setStartCamera] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState('off');
  
    const __startCamera = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log(status);
      if (status === 'granted') {
        setStartCamera(true);
      } else {
        Alert.alert('Access denied');
      }
    };
    const __takePicture = async () => {
        try {
            if (camera.current) {
                let photo = await camera.current.takePictureAsync();
                console.log(photo.uri);
                setPreviewVisible(true);
                setCapturedImage(photo);
              }
        } catch (error) {
          console.error('Error taking picture:', error);
        
        }
      };
    
      const __savePhoto = () => {};
    
      const __retakePicture = () => {
        setCapturedImage(null);
        setPreviewVisible(false);
        __startCamera();
      };
    
      const __handleFlashMode = () => {
        if (flashMode === 'on') {
          setFlashMode('off');
        } else if (flashMode === 'off') {
          setFlashMode('on');
        } else {
          setFlashMode('auto');
        }
      };
    
      const __switchCamera = () => {
        if (cameraType === 'back') {
          setCameraType('front');
        } else {
          setCameraType('back');
        }
      };
    
      return (
        <View style={styles.container}>
          {startCamera ? (
            <View style={{ flex: 1, width: '100%' }}>
              {previewVisible && capturedImage ? (
                <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
              ) : (
                <Camera
                  type={cameraType}
                  flashMode={flashMode}
                  style={{ flex: 1 }}
                  ref={camera}
                >
                  <View
                    style={{
                      flex: 1,
                      width: '100%',
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                    }}
                  >
                    <View
                      style={{
                        position: 'absolute',
                        left: '5%',
                        top: '10%',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <TouchableOpacity
                        onPress={__handleFlashMode}
                        style={{
                          backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                          borderRadius: 25,
                          height: 50,
                          width: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ fontSize: 30 }}>{flashMode === 'off' ? '⚡️' : '🔦'}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={__switchCamera}
                        style={{
                          marginTop: 20,
                          borderRadius: 25,
                          height: 50,
                          width: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ fontSize: 30 }}>{cameraType === 'front' ? '🤳' : '📷'}</Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        flexDirection: 'row',
                        flex: 1,
                        width: '100%',
                        padding: 20,
                        justifyContent: 'center',
                      }}
                    >
                      <TouchableOpacity
                       ref={camera}
                        onPress={__takePicture}
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 35,
                          backgroundColor: '#fff',
                        }}
                      />
                    </View>
                  </View>
                </Camera>
              )}
            </View>
          ) : (
            <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={__startCamera}
                style={{
                  width: 130,
                  borderRadius: 4,
                  backgroundColor: '#14274e',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Take picture</Text>
              </TouchableOpacity>
            </View>
          )}
          <StatusBar style="auto" />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    
    const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
      console.log('sdsfds', photo);
      return (
        <View style={{ backgroundColor: 'transparent', flex: 1, width: '100%', height: '100%' }}>
          <ImageBackground
            source={{ uri: photo && photo.uri }}
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                padding: 15,
                justifyContent: 'flex-end',
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  onPress={retakePicture}
                  style={{
                    width: 130,
                    height: 40,
                    alignItems: 'center',
                    borderRadius: 4,
                    backgroundColor: '#14274e',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 20 }}>Re-take</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={savePhoto}
                  style={{
                    width: 130,
                    height: 40,
                    alignItems: 'center',
                    borderRadius: 4,
                    backgroundColor: '#14274e',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 20 }}>Save photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    };
export default TakePic;
