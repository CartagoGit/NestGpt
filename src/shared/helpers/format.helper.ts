import { IGptAudioFormat, IKindFormatFile } from '../interfaces/api.interface';
import { gptAudioFormats } from '../services/contants.service';

export const getKindFormat = (format: IGptAudioFormat): IKindFormatFile => {
    const kind = {
        audio: gptAudioFormats.includes(format),
    };
    for (const key in kind) {
        if (kind[key]) return key as IKindFormatFile;
    }
    throw new Error('Format not found');
};
