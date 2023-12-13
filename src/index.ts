import * as path from 'path';
import config from './config';
import { CognitoInterface } from './interfaces/CognitoInterface';
import getCsvDatas from './utils/getCsvDatas';
import updateUserAttribute from './utils/updateUserAttribute';

const { fieldsToUpdates, timeToWait } = config;

// Parse csv file & process data update
getCsvDatas<CognitoInterface>(path.resolve(__dirname, './data.csv')).then(
  async (datas) => {
    for (const data of datas) {
      await updateUserAttribute({
        userAttributes: Object.keys(data)
          .filter((key) => fieldsToUpdates.includes(key))
          .map((key: string) => ({
            Name: key,
            Value: data[key as keyof CognitoInterface],
          })),
        username: data['cognito:username'],
      }).catch((err) => {
        console.log(
          '\u001b[31mERROR\u001b[0m',
          data['cognito:username'],
          `\u001b[31m${err.message}\u001b[0m`,
          '\n'
        );
      });

      await new Promise((resolve) => setTimeout(resolve, timeToWait));
    }
  }
);
