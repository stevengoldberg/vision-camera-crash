import { StyleSheet, SafeAreaView, Text, View, Pressable } from 'react-native'
import { useEffect, useState, useRef } from 'react'
import CameraView from './CameraView'

import { useCameraPermission } from 'react-native-vision-camera'

export default function App() {
    const { hasPermission, requestPermission } = useCameraPermission()
    const [useMaxIso, setUseMaxIso] = useState(false)
    const [photoPath, setPhotoPath] = useState(null)
    const cameraRef = useRef()
    useEffect(() => {
        const getPermissionStatus = async () => {
            if (!hasPermission) {
                await requestPermission()
            }
        }
        getPermissionStatus()
    }, [])

    const handleToggleMaxIso = () => {
        if (useMaxIso) {
            setUseMaxIso(false)
        } else {
            setUseMaxIso(true)
        }
    }
    const handleTakePhoto = async () => {
        try {
            console.log('Taking photo')
            const { path } = await cameraRef.current?.takePhoto()
            setPhotoPath(path)
        } catch (e) {
            console.log(`Error taking photo: ${e}`)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text>Using max iso: {useMaxIso.toString()}</Text>
            <Pressable style={styles.button} onPress={handleToggleMaxIso}>
                <Text style={styles.buttonLabel}>Toggle max ISO</Text>
            </Pressable>
            {hasPermission ? (
                <>
                    <CameraView cameraRef={cameraRef} useMaxIso={useMaxIso} />
                    <Pressable style={styles.button} onPress={handleTakePhoto}>
                        <Text style={styles.buttonlabel}>Capture photo</Text>
                    </Pressable>
                    <Text>Captured photo path: {photoPath}</Text>
                </>
            ) : (
                <Text>Camera permission required</Text>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 20,
    },
    buttonLabel: {
        fontWeight: 'bold',
    },
})
