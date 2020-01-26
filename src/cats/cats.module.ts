import { Module } from '@nestjs/common';
import { CatsResolver } from './cats.resolver';

@Module({
    imports: [],
    controllers: [],
    providers: [CatsResolver],
})
export class CatsModule {}
