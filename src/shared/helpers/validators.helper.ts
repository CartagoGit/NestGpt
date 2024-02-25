import {
    BadRequestException,
    ExecutionContext,
    FileTypeValidator,
    FileValidator,
    MaxFileSizeValidator,
    createParamDecorator,
} from '@nestjs/common';
import { IKindFormatFile } from '../interfaces/api.interface';
import { kindFormat } from '../services/contants.service';
import { arrayConjunction } from './index.helpers';

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

//* Decorator to validate the file kind, extension and size and let create a file if it doesn't exist and upload it
export const UploadedFileKind = (props: {
    kind: IKindFormatFile;
    maxMb?: number;
    createFile?: boolean;
}): ParameterDecorator => {
    const { kind, maxMb = 5, createFile = false } = props;
    return createParamDecorator((data: unknown, req: ExecutionContext) => {
        const file = req.switchToHttp().getRequest().file;
        const validations = [
            new FileTypeValidator({ fileType: `${kind}/*` }),
            new FileExtensionValidator({ kind }),
            new MaxFileSizeValidator({
                maxSize: 1000 * 1024 * maxMb,
                message: `File is bigger than ${maxMb}MB`,
            }),
        ];
        for (const validator of validations) {
            if (!validator.isValid(file)) {
                const formats = [...kindFormat[kind]];
                throw new BadRequestException(
                    validator.buildErrorMessage(file),
                    {
                        cause: 'File validation error',
                        description: `File must be a valid ${kind} file with ${arrayConjunction(formats)} extension and a maximum size of ${maxMb}MB.`,
                    },
                );
            }
        }
        return file;
    })();
};
