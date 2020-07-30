import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify, { PubSub, Auth } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import { MqttOverWSProvider } from "@aws-amplify/pubsub/lib/Providers";

// Apply plugin with configuration
Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: 'us-east-2',
  aws_pubsub_endpoint: 'wss://a39ib5112tlo2l-ats.iot.us-east-2.amazonaws.com/mqtt',
}));

// Apply plugin with configuration
Amplify.addPluggable(new MqttOverWSProvider({
  aws_pubsub_endpoint: 'wss://iot.eclipse.org:443/mqtt',
}));

PubSub.configure();

function getCognitoIdentityId() {
  Auth.currentCredentials().then((info) => {
    const cognitoIdentityId = info.identityId;
    console.log(cognitoIdentityId)
  });
}

function App() {
  getCognitoIdentityId()
  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Working with Auth</h1>
      </header>

      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
