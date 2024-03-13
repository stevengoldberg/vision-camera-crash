import { View, Text, StyleSheet, Dimensions } from 'react-native'
import {
    useCameraDevice,
    useCameraFormat,
    Camera,
} from 'react-native-vision-camera'
import { useRef } from 'react'

export default function CameraView({ useMaxIso, cameraRef }) {
    const physicalDevices = [
        'ultra-wide-angle-camera',
        'wide-angle-camera',
        'telephoto-camera',
    ]
    const device = useCameraDevice('back', { physicalDevices })
    const windowWidth = Dimensions.get('window').width

    const formatFilter = [
        {
            photoAspectRatio: 4 / 3,
        },
        { photoResolution: 'max' },
        { videoResolution: { width: 1024, height: 768 } },
        { photoHdr: true },
    ]
    if (useMaxIso) {
        formatFilter.unshift({ iso: 'max' })
    }
    const format = useCameraFormat(device, formatFilter)

    console.log(format)

    return (
        <View flex={1} style={styles.container}>
            {device ? (
                <View style={styles.cameraContainer}>
                    <Camera
                        style={{
                            width: windowWidth,
                            flex: 1,
                            alignSelf: 'flex-start',
                        }}
                        device={device}
                        format={format}
                        isActive
                        enableHighQualityPhotos
                        photo
                        ref={cameraRef}
                        zoom={device.neutralZoom}
                    />
                </View>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cameraContainer: {
        aspectRatio: 3 / 4,
        width: '100%',
    },
})
