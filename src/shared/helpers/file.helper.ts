import * as path from 'node:path';
import * as fsp from 'node:fs/promises';
import shortUuid from 'short-uuid';
import type { Response } from 'node-fetch';
import {
    IGptAudioFormat,
    IKindFormatFile,
} from '../interfaces/index.interfaces';
import { getKindFormat } from './index.helpers';
import { route } from '../services/contants.service';

export const createDataFile = (props: { format: IGptAudioFormat }) => {
    const { format } = props;
    const fileName = `${new Date().getTime().toString().padStart(14, '0')}_${shortUuid().new().slice(0, 5)}.${format}`;
    const folderPath = getPath(`generated/${getKindFormat(format)}s`);
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

export const getPath = (endpoint: string) => {
    return path.join(process.cwd(), endpoint);
};

export const getPathGenerated = () => {
    return path.join(process.cwd(), route.generated);
};

export const getPathKindFile = (kind: IKindFormatFile) => {
    return path.join(getPathGenerated(), kind);
};

export const getPathFile = (fileName: string) => {
    const format = fileName.split('.').at(-1) as IGptAudioFormat;
    const kind = getKindFormat(format);
    return path.join(getPathKindFile(kind), fileName);
};
