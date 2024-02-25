import {
    BadRequestException,
    ExecutionContext,
    FileTypeValidator,
    MaxFileSizeValidator,
    createParamDecorator,
} from '@nestjs/common';
import {
    IGptFileFormat,
    IKindFormatFile,
} from '../interfaces/index.interfaces';
import {
    FileExtensionValidator,
    arrayConjunction,
    createFile,
    createFileData,
} from '../helpers/index.helpers';
import { kindFormat } from '../services/contants.service';

//* Decorator to validate the file kind, extension and size and let create a file if it doesn't exist and upload it
export const UploadedFileKind = (props: {
    kind: IKindFormatFile;
    maxMb?: number;
    hasCreateFile?: boolean;
}): ParameterDecorator => {
    const { kind, maxMb = 5, hasCreateFile = false } = props;
    return createParamDecorator(
        async (_data: unknown, ctx: ExecutionContext) => {
            const file: Express.Multer.File = ctx
                .switchToHttp()
                .getRequest().file;
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
            if (hasCreateFile) {
                const [initFileName, extension] = file.originalname.split('.');
                const { folderPath, filePath } = createFileData({
                    format: extension as IGptFileFormat,
                    isUpload: true,
                    initFileName,
                });
                await createFile({ buffer: file.buffer, folderPath, filePath });
            }
            ctx.switchToHttp().getRequest().body.file = file;
            // const body = ctx.switchToHttp().getRequest().body;
            return file;
        },
    )();
};
