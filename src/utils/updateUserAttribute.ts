import { CognitoIdentityServiceProvider } from 'aws-sdk';
import config from 'src/config';

const {
  aws: { cognitoISP, userPoolId },
} = config;

export default function updateUserAttribute({
  userAttributes,
  username,
}: {
  userAttributes: CognitoIdentityServiceProvider.Types.AdminUpdateUserAttributesRequest['UserAttributes'];
  username: string;
}) {
  return new Promise((resolve, reject) => {
    let params: CognitoIdentityServiceProvider.Types.AdminUpdateUserAttributesRequest =
      {
        UserAttributes: userAttributes,
        UserPoolId: userPoolId,
        Username: username,
      };

    cognitoISP.adminUpdateUserAttributes(params, (err, data) =>
      err ? reject(err) : resolve(data)
    );
  });
}
