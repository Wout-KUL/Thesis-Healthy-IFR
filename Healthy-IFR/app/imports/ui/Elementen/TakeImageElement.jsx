import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import {Camera} from "react-camera-pro";
import { test } from '../Elementen/TalkWithPython';
import { Alert } from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';


const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 65%;
  z-index: 1;
`;

const Control = styled.div`
  position: fixed;
  display: flex;
  right: 0;
  width: 20%;
  min-width: 130px;
  min-height: 130px;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  box-sizing: border-box;
  flex-direction: column-reverse;
  @media (max-aspect-ratio: 1/1) {
    flex-direction: row;
    bottom: 0;
    width: 100%;
    height: 20%;
  }
  @media (max-width: 400px) {
    padding: 10px;
  }
`;

const Button = styled.button`
  outline: none;
  color: white;
  opacity: 1;
  background: transparent;
  background-color: transparent;
  background-position-x: 0%;
  background-position-y: 0%;
  background-repeat: repeat;
  background-image: none;
  padding: 0;
  text-shadow: 0px 0px 4px black;
  background-position: center center;
  background-repeat: no-repeat;
  pointer-events: auto;
  cursor: pointer;
  z-index: 2;
  filter: invert(100%);
  border: none;
  &:hover {
    opacity: 0.7;
  }
`;

const TakePhotoButton = styled(Button)`
  background: url('https://img.icons8.com/ios/50/000000/compact-camera.png');
  background-position: center;
  background-size: 50px;
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;


  position: relative;
  left: 50%;
  -ms-transform: translate(-50%, 0);
  transform: translate(-50%, 0);


  border: solid 4px black;
  border-radius: 50%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const ChangeFacingCameraButton = styled(Button)`
  background: url(https://img.icons8.com/ios/50/000000/switch-camera.png);
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  padding: 40px;
  &:disabled {
    opacity: 0;
    cursor: default;
    padding: 60px;
  }
  @media (max-width: 400px) {
    padding: 40px 5px;
    &:disabled {
      padding: 40px 25px;
    }
  }
`;

const ImagePreview = styled.div`
  width: 120px;
  height: 120px;
  ${({ image }) => (image ? `background-image:  url(${image});` : '')}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @media (max-width: 400px) {
    width: 120px;
    height: 120px;
  }
`;



export const TakeImageElement =(props)=>{
  const [log, logNav, rootURL] = useOutletContext();

  const nav =  useNavigate();
  const navigate = (value, state) => nav(rootURL+ value, state)
    const [numberOfCameras, setNumberOfCameras] = useState(0);
    const camera = useRef(null)
    const [devices, setDevices] = useState([]);
    const [activeDeviceId, setActiveDeviceId] = useState(undefined);
  
    useEffect(() => {
      (async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((i) => i.kind == 'videoinput');
        setDevices(videoDevices);
      })();
    });

    function goToExplanationsPage () {
      log('/ExplanationsPage' + "_Recognition")
        navigate('/ExplanationsPage',
            {state : {recognition: true}}
        )
      }

  
      
    //js als <div een value heeft => niet undifined => true
    // console.log(props.children)
    return (
        <div className='remaining'>
        {numberOfCameras == 0? <Alert severity="error" onClick={goToExplanationsPage}>Geen camera herkent, klik op dit bericht voor een oplossing.</Alert>: <></>}
        <div className='IR-div-scrollable clearfix'>
        <Wrapper>
            <Camera
              ref={camera}
              aspectRatio="cover"
              numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
              videoSourceDeviceId={activeDeviceId}
              errorMessages={{
                noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
                permissionDenied: 'Permission denied. Please refresh and give camera permission.',
                switchCamera:
                  'It is not possible to switch camera to different one because there is only one video device accessible.',
                canvas: 'Canvas is not supported.',
              }}
            />
          <Control>
            {/* <select
              onChange={(event) => {
                setActiveDeviceId(event.target.value);
              }}
            >
              {devices.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label}
                </option>
              ))}
            </select> */}
            {/* <ImagePreview
              image={props.image}
              onClick={() => {

              }}
            /> */}
            <TakePhotoButton
              onClick={() => {
                if (camera.current) {
                  // var constraints = { audio: true, video: true };
                  // navigator.mediaDevices.getUserMedia(constraints)
                  log("Take_Photo")
                  const photo = camera.current.takePhoto();
                  console.log(photo.substring(0,100));
                  props.setImage(photo);
                  console.log(photo.length);
                  // test()
                  // console.log("resultaat is ", test)
                  // test.then(text => console.log(text))
                  Meteor.call('Python.runRecognition', photo, (err, res) => {

                    if (err) {
                      alert(err);
                      console.error(e);
                    } else {
                      console.error("Succes");
                      console.log("res is ", res)
    
                      res = JSON.parse(res.replaceAll("'", ""));
                      console.log("res is ", res)
                      props.setRecogniseIngredientArray(res)
                    }
                  });
                props.setShowImage(!props.showImage);
                console.log(props.showImage);
                }
              }}
            />
            <ChangeFacingCameraButton
              disabled={numberOfCameras <= 1}
              onClick={() => {
                if (camera.current) {
                  const result = camera.current.switchCamera();
                  console.log(result);
                }
              }}
            />
          </Control>
        </Wrapper>
        </div>

        </div>
    );
}