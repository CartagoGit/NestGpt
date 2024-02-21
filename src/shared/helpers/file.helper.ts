import * as path from 'node:path';
import * as fsp from 'node:fs/promises';
import shortUuid from 'short-uuid';
import type { Response } from 'node-fetch';
import {
    IGptAudioFormat,
    IKindFormatFile,
} from '../interfaces/index.interfaces';
import { gptAudioFormats, route } from '../services/contants.service';

export const createFileName = (props: {
    extension: string;
    initFileName?: string;
}) => {
    const { extension, initFileName = undefined } = props;
    const fileName = `${initFileName ? initFileName + '_' : ''}${new Date().getTime().toString().padStart(14, '0')}_${shortUuid().new().slice(0, 5)}.${extension}`;
    return fileName;
};

export const createFileData = (props: { format: IGptAudioFormat }) => {
    const { format } = props;
    const fileName = createFileName({
        extension: format,
    });
    const folderPath = getPathKindFile(getKindFormat(format));
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
    await fsp.chmod(filePath, 0o777);
};

export const getPath = (endpoint: string) => path.join(process.cwd(), endpoint);

export const getPathGenerated = () => getPath(route.generated);

export const getPathUploads = () => getPath(route.uploads);

export const getPathKindFile = (
    kind: IKindFormatFile,
    options?: { isUpload?: boolean },
) => {
    const { isUpload = false } = options || {};
    const pathToJoin = [isUpload ? getPathUploads() : getPathGenerated(), kind];
    return path.join(...pathToJoin);
};

export const getPathFile = (fileName: string) => {
    const format = fileName.split('.').at(-1) as IGptAudioFormat;
    const kind = getKindFormat(format);
    return path.join(getPathKindFile(kind), fileName);
};

export const getKindFormat = (format: IGptAudioFormat): IKindFormatFile => {
    const kind = {
        audio: gptAudioFormats.includes(format),
    };
    for (const key in kind) {
        if (kind[key]) return key as IKindFormatFile;
    }
    throw new Error('Format not found');
};
