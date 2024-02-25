import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    Type,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export const FileToBodyInterceptor = (
    paramName: string,
    options?: { removeParam?: boolean; newParamName?: string },
): Type<NestInterceptor> => {
    @Injectable()
    class NestedInterceptor implements NestInterceptor {
        intercept(
            context: ExecutionContext,
            next: CallHandler,
        ): Observable<any> {
            const { removeParam = true, newParamName = undefined } =
                options || {};
            if (!paramName)
                throw new BadRequestException('The paramName is required');
            const request = context.switchToHttp().getRequest<Request>();
            const file = request[paramName];

            if (!file)
                throw new BadRequestException(
                    `There are not files with the parameter ${paramName} name`,
                );

            if (removeParam) delete request[paramName];

            return next.handle().pipe(
                map((data) => ({
                    ...data,
                    [newParamName || paramName]: file,
                })),
            );
        }
    }

    return NestedInterceptor;
};
