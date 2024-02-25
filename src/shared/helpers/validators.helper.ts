import { IKindFormatFile } from '../interfaces/api.interface';
import { kindFormat } from '../services/contants.service';
import {
    FileTypeValidator,
    FileValidator,
    MaxFileSizeValidator,
    ParseFilePipe,
    UploadedFile,
} from '@nestjs/common';

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

//* Expand the UploadedFile decorator to include the kind of file and validators automatically
export const UploadedFileKind = (props: {
    kind: IKindFormatFile;
    maxMb?: number;
    createFile?: boolean;
}): ParameterDecorator => {
    console.log('entro');
    const { kind, maxMb = 5, createFile = false } = props;
    const result = UploadedFile(
        new ParseFilePipe({
            validators: [
                new FileTypeValidator({ fileType: `${kind}/*` }),
                new FileExtensionValidator({ kind }),
                new MaxFileSizeValidator({
                    maxSize: 1000 * 1024 * maxMb,
                    message: `File is bigger than ${maxMb}MB`,
                }),
            ],
        }),
    );
    if (createFile) {
        console.log('createFile');
    }
    console.log('result', result);
    return result;
};
