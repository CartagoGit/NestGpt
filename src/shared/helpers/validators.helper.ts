import { IKindFormatFile } from '../interfaces/api.interface';
import { kindFormat } from '../services/contants.service';
import { FileValidator } from '@nestjs/common';

export class FileExtensionValidator extends FileValidator {
    public readonly validationOptions: { kind: IKindFormatFile };
    public formats: string[];
    constructor(validationOptions: { kind: IKindFormatFile }) {
        super(validationOptions);
        this.validationOptions = validationOptions;
        this.formats = [...kindFormat[validationOptions.kind]];
    }

    public isValid = (file: Express.Multer.File): boolean => {
        const [_fileWithoutExtension, extension] = file.originalname
            .toLowerCase()
            .split('.');
        return this.formats.includes(extension);
    };
    public buildErrorMessage = (_file: Express.Multer.File): string => {
        const conjunction = new Intl.ListFormat('en-US', {
            style: 'long',
            type: 'conjunction',
        });
        return `Invalid file extension. Only ${conjunction.format(this.formats)} are allowed.`;
    };
}
