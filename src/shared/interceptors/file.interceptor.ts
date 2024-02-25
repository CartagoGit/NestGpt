import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    Type,
} from '@nestjs/common';
import { Observable, Subscriber } from 'rxjs';
import multer, { Multer } from 'multer';
import { Request } from 'express';

interface IIntercept {
    context: ExecutionContext;
    next: CallHandler;
}

export const FileToBodyInterceptor = (
    paramName: string,
    options?: {
        newParamName?: string;
        isMultiple?: boolean;
        cleanParam?: boolean;
    },
): Type<NestInterceptor> => {
    const {
        newParamName = undefined,
        isMultiple = false,
        cleanParam = true,
    } = options || {};
    @Injectable()
    class NestedInterceptor implements NestInterceptor {
        private _multer: Multer = multer();

        public intercept(
            context: ExecutionContext,
            next: CallHandler,
        ): Observable<any> {
            if (!paramName)
                throw new BadRequestException('The param name is required');
            const handleProps = {
                context,
                next,
            };

            return this._handleMulterFile(handleProps);
        }

        private _handleMulterFile(props: IIntercept): Observable<any> {
            return isMultiple
                ? this._getMultipleHandle(props)
                : this._getSingleHandle(props);
        }

        private _getSingleHandle(props: IIntercept): Observable<any> {
            const { context } = props;
            return new Observable((observer) => {
                const request = context.switchToHttp().getRequest<Request>();
                this._multer.single(paramName)(
                    request,
                    null,
                    this._multerRequestHandler({ ...props, observer }),
                );
            });
        }

        private _getMultipleHandle(props: IIntercept): Observable<any> {
            return new Observable((observer) => {});
        }

        private _multerRequestHandler = (
            props: IIntercept & { observer: Subscriber<any> },
        ) => {
            const { context, next, observer } = props;
            const request = context.switchToHttp().getRequest<Request>();
            return (err: any) => {
                if (err) {
                    return observer.error(new BadRequestException(err.message));
                }
                const file = request[paramName];
                if (!file) {
                    observer.error(
                        new BadRequestException(
                            `Files were not uploaded with the field name ${paramName}`,
                        ),
                    );
                    return;
                }
                if (cleanParam) delete request[paramName];
                const body = {
                    ...request.body,
                    [newParamName || paramName]: file,
                };
                context.switchToHttp().getRequest().body = body;
                next.handle().subscribe({
                    next: (data) => observer.next(data),
                    error: (err) => observer.error(err),
                    complete: () => observer.complete(),
                });
            };
        };
    }

    return NestedInterceptor;
};
