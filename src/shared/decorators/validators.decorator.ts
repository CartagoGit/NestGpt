import { registerDecorator } from 'class-validator';
import { IKindFormatFile } from '../interfaces/index.interfaces';

export const IsFileKind = (props: {
    kind: IKindFormatFile;
    maxMb?: number;
    hasCreateFile?: boolean;
}): PropertyDecorator => {
    const { kind, maxMb = 5, hasCreateFile = false } = props;

    // TODO: Implement the decorator
    return (target: Object, propertyName: string) => {
        registerDecorator({
            propertyName,
            name: 'IsFileKind',
            target: target.constructor,
            constraints: [kind, maxMb, hasCreateFile],
            options: {
                message: `File is bigger than ${maxMb}MB`,
            },
            async: true,
            validator: {
                validate(value: any, args: any) {
                    console.log({ target, propertyName });
                    console.log({ value, args });
                    return true;
                },

            },
        });
    };
};
