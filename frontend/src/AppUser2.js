// AppUser2.js for User 2
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function AppUser2() {
  const [peerConnection, setPeerConnection] = useState(null);
  const [dataChannel, setDataChannel] = useState(null);

  useEffect(() => {
    // Initialize peer connection
    const pc = new RTCPeerConnection();

    // Add event listeners for ICE candidates and data channel
    pc.onicecandidate = handleICECandidate;
    pc.ondatachannel = handleDataChannel;

    setPeerConnection(pc);

    // Listen for offer from User 1
    socket.on('offer', handleOffer);

    return () => {
      pc.close();
    };
  }, []);

  const handleOffer = (offer) => {
    // Set remote description and create answer
    peerConnection.setRemoteDescription(offer)
      .then(() => peerConnection.createAnswer())
      .then(answer => {
        peerConnection.setLocalDescription(answer);
        // Send answer to User 1
        socket.emit('answer', answer);
      })
      .catch(error => console.error('Error creating answer:', error));
  };

  const handleICECandidate = (event) => {
    if (event.candidate) {
      // Send ICE candidate to remote peer (User 1)
      socket.emit('iceCandidate', event.candidate);
    }
  };

  const handleDataChannel = (event) => {
    const dc = event.channel;
    dc.binaryType = 'arraybuffer';
    dc.onopen = handleDataChannelOpen;
    dc.onmessage = handleDataChannelMessage;
    setDataChannel(dc);
  };

  const handleDataChannelOpen = () => {
    console.log('Data channel is open');
  };

  const handleDataChannelMessage = (event) => {
    // Handle incoming data messages from remote peer (User 1)
    console.log('Received message:', event.data);
  };

  return (
    <div>
      <h2>User 2</h2>
      <p>Waiting for connection...</p>
    </div>
  );
}

export default AppUser2;
