import React, { useEffect, useRef } from 'react';
import { Button, Col, Row } from 'react-bootstrap'

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


  const savePhoto = () => {
    canvas.current.toBlob(
      blob => {
        const anchor = document.createElement('a')
        anchor.download = 'my-file-name.jpg' // optional, but you can give the file a name
        anchor.href = URL.createObjectURL(blob)
        anchor.click(); // ✨ magic!
        URL.revokeObjectURL(anchor.href) // remove it from memory and save on memory! 😎
      },
      'image/jpeg',
      0.9,
    )
  }

  return (
    <div className="c-camera-feed">
      <Row>
        <Col>
          <div className="c-camera-feed__viewer">
            <video style={{ borderRadius: '3px' }} ref={videoPlayer} width="680" heigh="360" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className='btn-warning rounded mb-2 ' onClick={() => takePhoto()}>Take photo!</Button>
        </Col>
      </Row>
      <Button className='btn-danger mr-2' onClick={() => turnCameraOff()}>Turn off Camera</Button>
      <Button className='btn-success mr-2' onClick={() => turnCameraOn()}>Turn on Camera</Button>
      <Button onClick={(e) => savePhoto(e)}>Save photo!</Button>
      <div className="c-camera-feed__stage mt-2">
        <canvas className='canvas' width="680" height="360" ref={canvas} />
      </div>
    </div>
  )
}

export default CameraFeed
