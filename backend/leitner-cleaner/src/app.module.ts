import { Module } from '@nestjs/common';
import { ConnectedUserController } from './controllers';
import { CardService, QuizzService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Card]),
  ],
  controllers: [ConnectedUserController],
  providers: [CardService, QuizzService],
})
export class AppModule {}
