// App.js for User 1
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

function AppUser1() {
  const [peerConnection, setPeerConnection] = useState(null);
  const [dataChannel, setDataChannel] = useState(null);
  const [fileToSend, setFileToSend] = useState(null);

  useEffect(() => {
    // Initialize peer connection
    const pc = new RTCPeerConnection();

    // Create data channel
    const dc = pc.createDataChannel('dataChannel');
    dc.binaryType = 'arraybuffer';

    // Add event listeners for ICE candidates and data channel
    pc.onicecandidate = handleICECandidate;
    pc.ondatachannel = handleDataChannel;

    setPeerConnection(pc);

    return () => {
      pc.close();
    };
  }, []);

  const handleICECandidate = (event) => {
    if (event.candidate) {
      // Send ICE candidate to remote peer
      socket.emit('iceCandidate', event.candidate);
    }
  };

  const handleDataChannel = (event) => {
    const dc = event.channel;
    dc.binaryType = 'arraybuffer';
    dc.onopen = handleDataChannelOpen;
    dc.onmessage = handleDataChannelMessage;
    setDataChannel(dc);

    // Check if there's a file waiting to be sent
    if (fileToSend) {
      sendFile();
    }
  };

  const handleDataChannelOpen = () => {
    console.log('Data channel is open');
  };

  const handleDataChannelMessage = (event) => {
    // Handle incoming data messages from remote peer
    console.log('Received message:', event.data);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileToSend(file);
  };

  const sendFile = () => {
    if (dataChannel.readyState === 'open') {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Send the file data over the data channel
        dataChannel.send(reader.result);
      };
      reader.readAsArrayBuffer(fileToSend);
    } else {
      console.log('Data channel is not open yet. Unable to send file data.');
    }
  };

  const handleOffer = () => {
    // Create and send offer to remote peer
    peerConnection.createOffer()
      .then(offer => {
        peerConnection.setLocalDescription(offer);
        socket.emit('offer', offer);
      })
      .catch(error => console.error('Error creating offer:', error));
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleOffer}>Connect and Send Data</button>
    </div>
  );
}

export default AppUser1;
