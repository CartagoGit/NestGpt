import { IGptAudioFormat } from '../interfaces/api.interface';
import { gptAudioFormats } from '../services/contants.service';

export const getKindFormat = (format: IGptAudioFormat) => {
    const kind = {
        audio: gptAudioFormats.includes(format),
    };
    for (const key in kind) {
        if (kind[key]) return key;
    }
    throw new Error('Format not found');
};
