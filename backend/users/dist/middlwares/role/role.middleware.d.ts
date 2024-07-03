import { NestMiddleware } from '@nestjs/common';
export declare class RoleMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): void;
}
