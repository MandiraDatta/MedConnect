import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <-- Import the ConfigModule
import { PrismaService } from './prisma.service';

@Global() // Optional: Makes the module available everywhere, often useful for Prisma
@Module({
  imports: [
    // 💡 This is the critical line that fixes the dependency error!
    ConfigModule.forRoot({
        isGlobal: true, // You may already have this setup in your AppModule
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService], // Must export the service so other modules can use it
})
export class PrismaModule {}
