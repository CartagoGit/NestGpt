import {
    BadRequestException,
    ExecutionContext,
    FileTypeValidator,
    FileValidator,
    MaxFileSizeValidator,
    createParamDecorator,
} from '@nestjs/common';
import type {
    IGptFileFormat,
    IKindFormatFile,
} from '../interfaces/api.interface';
import { kindFormat } from '../services/contants.service';
import { arrayConjunction, createFileData, createFile } from './index.helpers';

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
        return `Invalid file extension. Only ${arrayConjunction(this.formats)} are allowed.`;
    };
}
