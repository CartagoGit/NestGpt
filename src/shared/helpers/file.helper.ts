import * as path from 'node:path';
import * as fsp from 'node:fs/promises';
import * as shortUuid from 'short-uuid';
import type { Response } from 'node-fetch';
import { IGptAudioFormat } from '../interfaces/index.interfaces';
import { getKindFormat } from './index.helpers';

const uuid = shortUuid();

export const createDataFile = (props: { format: IGptAudioFormat }) => {
    const { format } = props;
    const fileName = `${new Date().getTime().toString().padStart(14, '0')}_${uuid.new().slice(0, 5)}.${format}`;
    const folderPath = path.resolve(
        __dirname,
        `../../../generated/${getKindFormat(format)}s`,
    );
    const filePath = path.resolve(folderPath, fileName);
    return { fileName, folderPath, filePath };
};

export const createFile = async (props: {
    file: Response;
    folderPath: string;
    filePath: string;
}) => {
    const { file, folderPath, filePath } = props;
    const buffer = Buffer.from(await file.arrayBuffer());
    await fsp.mkdir(folderPath, { recursive: true });
    await fsp.writeFile(filePath, buffer);
};

export const createFileStream = async (props: {}) => {}