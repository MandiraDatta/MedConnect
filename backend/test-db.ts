import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: 'backend/.env' });

async function main() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    await prisma.$connect();
    console.log('Connected to DB');

    const email = `test-${Date.now()}@example.com`;
    console.log(`Creating user with email: ${email}`);

    const user = await prisma.doctorLogin.create({
      data: {
        email,
        password: 'password123',
        supabaseId: `supa-${Date.now()}`
      },
    });

    console.log('User created:', user);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
