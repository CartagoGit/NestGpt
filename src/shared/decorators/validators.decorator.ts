import { registerDecorator } from 'class-validator';
import { IKindFormatFile } from '../interfaces/index.interfaces';

export const IsFileKind = (props: {
    kind: IKindFormatFile;
    maxMb?: number;
    hasCreateFile?: boolean;
}): PropertyDecorator => {
    const { kind, maxMb = 5, hasCreateFile = false } = props;

    return (target: Object, propertyName: string) => {
        // descriptor.enumerable = value;
        registerDecorator({
            propertyName,
            name: 'IsFileKind',
            target: target.constructor,
            constraints: [kind, maxMb, hasCreateFile],
            options: {
                message: `File is bigger than ${maxMb}MB`,
            },
            validator: {
                validate(value: any, args: any) {
                    // console.log({ target, propertyName });
                    console.log({ value, args });
                    return true;
                },
            },
        });
    };
};
