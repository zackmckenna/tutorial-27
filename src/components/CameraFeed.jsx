import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap'

const CameraFeed = () => {
  const videoPlayer = useRef(null)
  const canvas = useRef(null)

  useEffect(() => {
    console.log(navigator.mediaDevices.enumerateDevices())
    async function getCamera() {
      console.log('enumerate devices:', navigator.mediaDevices.enumerateDevices())
      const cameras = await navigator.mediaDevices.enumerateDevices()
      processDevices(cameras)
    }
    getCamera()
  }, [])

  const processDevices = (devices) => {
        devices.forEach(device => {
          console.log('Device:', device.label)
            setDevice(device)
        })
    }

  const setDevice = async (device) => {
      const { deviceId } = device
      const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } })
      .then(stream => videoPlayer.current.srcObject = stream)
      .catch(err => console.log(err))
      videoPlayer.current.play()
    }

  const turnCameraOff = () => {
    videoPlayer.current.srcObject.getVideoTracks().forEach(track => track.stop())
  }

  const turnCameraOn = async () => {
    const cameras = await navigator.mediaDevices.enumerateDevices()
    processDevices(cameras)
  }

  const takePhoto = () => {
      const context = canvas.current.getContext('2d')
      context.drawImage(videoPlayer.current, 0, 0, canvas.current.width, canvas.current.height)
  }


  return (
    <div className="c-camera-feed">
      <div className="c-camera-feed__viewer">
        <video ref={videoPlayer} width="680" heigh="360" />
      </div>
      <Button className='mr-2' onClick={() => turnCameraOff()}>Turn off Camera</Button>
      <Button className='mr-2' onClick={() => turnCameraOn()}>Turn on Camera</Button>
      <Button onClick={() => takePhoto()}>Take photo!</Button>
      <div className="c-camera-feed__stage mt-2">
        <canvas className='canvas' width="680" height="360" ref={canvas} />
      </div>
    </div>
  )
}

export default CameraFeed
