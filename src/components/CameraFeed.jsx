import React, { useEffect, useRef } from 'react';

const CameraFeed = ({ sendFile }) => {
  const videoPlayer = useRef(null)
  const canvas = useRef(null)

  useEffect(async () => {
    const cameras = await navigator.mediaDevices.enumerateDevices();
    console.log(cameras)
    processDevices(cameras);
  }, [])

  const processDevices = (devices) => {
        devices.forEach(device => {
            console.log(device.label);
            setDevice(device);
        })
    }

  const setDevice = async (device) => {
      const { deviceId } = device
      const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } })
      .then(stream => videoPlayer.current.srcObject = stream)
      .catch(err => console.log(err))
      // videoPlayer.play()
      console.log(videoPlayer)
      // videoPlayer.srcObject = stream;
      // videoPlayer.play()
    }

   const takePhoto = (e) => {
              // const { sendFile } = this.props;
              console.log(canvas)
              // console.log(c anvas.ref.current.getContext())
              const context = canvas.current.getContext('2d')
              // const context = e.currentTarget.getContext('2d');
              console.log(context)
              console.log(videoPlayer)
              context.drawImage(videoPlayer.current, 0,0, 680, 360)

              // context.drawImage(videoPlayer, 0, 0, 680, 360);
              // canvas.toBlob(sendFile);
          }


  return (
    <div className="c-camera-feed">
      <div className="c-camera-feed__viewer">
        <video ref={videoPlayer} autoPlay width="680" heigh="360" />
      </div>
      <button onClick={(e) => takePhoto(e)}>Take photo!</button>
      <div className="c-camera-feed__stage">
        <canvas className='canvas' width="680" height="360" ref={canvas} />
      </div>
    </div>
  )
}

export default CameraFeed
