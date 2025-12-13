
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env from the backend directory
dotenv.config({ path: path.join(__dirname, '.env') });

async function main() {
  try {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error('DATABASE_URL is not defined');
    }
    console.log('Connecting to:', connectionString);

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    await prisma.$connect();
    console.log('Connected to database');

    const user = await prisma.user.create({
      data: {
        email: `test_${Date.now()}@example.com`,
        password: 'password123',
        name: 'Test User'
      },
    });
    console.log('Successfully created user:', user);
    
    await prisma.$disconnect();
  } catch (e) {
    console.error('Error creating user:', e);
    process.exit(1);
  }
}

main();
