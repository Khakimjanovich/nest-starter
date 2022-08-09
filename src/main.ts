import { NestFactory } from "@nestjs/core";
import { AppModule } from "./bootstrap/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(+process.env.APP_PORT);
}

bootstrap().then(() => {
  console.log(`App is running in: ${process.env.APP_URL}`);
});
