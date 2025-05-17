import { PrismaClient } from '../generated/prisma/index.js';
import { readFileSync } from 'fs';

const prisma = new PrismaClient();
const largeData = JSON.parse(readFileSync('./src/mock/large/products.json', 'utf-8'));
const smallData = JSON.parse(readFileSync('./src/mock/small/products.json', 'utf-8'));
const products = [...largeData, ...smallData];

async function main() {
  console.log(`🌱 Start seeding ...`);
  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        category: product.category,
      },
    });
  }
  console.log(`🌱 Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
