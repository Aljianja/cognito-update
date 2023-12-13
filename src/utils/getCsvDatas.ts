import * as fs from 'fs';
import { parse } from 'csv-parse';

const getCsvDatas = async <T = any[]>(filePath: string): Promise<T[]> => {
  return new Promise<T[]>((resolve) => {
    const csvData: any = [];
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true }))
      .on('data', (row) => {
        csvData.push(row);
      })
      .on('end', () => {
        resolve(csvData);
      });
  });
};

export default getCsvDatas;
