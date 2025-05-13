import { Module, DynamicModule } from '@nestjs/common';
import { SupertokensService } from './supertokens.service';
import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';
import { UserModule } from '../user/user.module';

@Module({
  providers: [SupertokensService],
  exports: [],
  imports: [UserModule],
  controllers: [],
})
export class AuthModule {
  static forRoot(config: AuthModuleConfig): DynamicModule {
    return {
      module: AuthModule,
      imports: [UserModule],
      providers: [
        {
          provide: ConfigInjectionToken,
          useValue: config,
        },
        SupertokensService,
      ],
      exports: [SupertokensService],
      controllers: [],
    };
  }
}
