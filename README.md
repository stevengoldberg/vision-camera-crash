## Steps to reproduce
1. Launch the app and grant camera permission
2. Pressing the "Capture photo" button will display the path of a temp photo
3. Press the "Max ISO" button to update the format
4. On an iPhone 14 pro, it still works as expected. 
5. On an iPhone 15 pro, pressing "Capture photo" after switching to the Max ISO format kicks off a promise that will never resolve. The app will crash after a few seconds of pointing the camera at different things, with the following error:
```
Your app just crashed. See the error below.
NSInvalidArgumentException: *** -[AVCaptureDevice setActiveDepthDataMinFrameDuration:] activeDepthDataMinFrameDuration cannot be set when activeDepthDataFormat is nil.
  0   CoreFoundation                      0x000000019966ab34 7A70D5D4-0550-38DC-AB33-71B72AFF1F5F + 969524
  1   libobjc.A.dylib                     0x00000001914b6f78 objc_exception_throw + 60
  2   AVFCapture                          0x00000001b6495c5c 86041496-AB5E-3852-BD13-FF79DDF7875C + 146524
  3   AVFCapture                          0x00000001b64980f4 86041496-AB5E-3852-BD13-FF79DDF7875C + 155892
  4   Phomo                               0x0000000102ee7bf0 $s12VisionCamera0B7SessionC15configureFormat13configuration6deviceyAA0B13ConfigurationC_So15AVCaptureDeviceCtKF + 1080
  5   Phomo                               0x0000000102ede920 $s12VisionCamera0B7SessionC9configureyyyAA0B13ConfigurationCKcFyyYbcfU_ + 2092
  6   Phomo                               0x00000001022539e0 $sIegh_IeyBh_TR + 48
  7   libdispatch.dylib                   0x00000001a147913c 7835E829-0652-3CB5-99D8-2CE521476DC0 + 8508
  8   libdispatch.dylib                   0x00000001a147add4 7835E829-0652-3CB5-99D8-2CE521476DC0 + 15828
  9   libdispatch.dylib                   0x00000001a1482400 7835E829-0652-3CB5-99D8-2CE521476DC0 + 46080
  10  libdispatch.dylib                   0x00000001a1482f30 7835E829-0652-3CB5-99D8-2CE521476DC0 + 48944
  11  libdispatch.dylib                   0x00000001a148dcb4 7835E829-0652-3CB5-99D8-2CE521476DC0 + 93364
  12  libdispatch.dylib                   0x00000001a148d528 7835E829-0652-3CB5-99D8-2CE521476DC0 + 91432
  13  libsystem_pthread.dylib             0x00000001f5568f20 _pthread_wqthread + 288
  14  libsystem_pthread.dylib             0x00000001f5568fc0 start_wqthread + 8
```
