import AWS from 'aws-sdk';

let cognitoISP = new AWS.CognitoIdentityServiceProvider({
  region: 'eu-west-1',
  // TODO: Add credential here
});

const config = {
  aws: {
    cognitoISP,
    userPoolId: 'eu-west-1_XXXXXXXXX', // TODO: Change this
  },
  fieldsToUpdates: ['family_name'], // TODO: Add the other key here
  timeToWait: 1000, // Time to wait between each update
};

export default config;
