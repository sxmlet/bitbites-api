type AppConfig = {
  appPort: string,
  bucket: string,
  awsRegion: string,
}

export const config: AppConfig = {
  appPort: process.env.PORT ?? '3002',
  bucket: process.env.BUCKET ?? '',
  awsRegion: process.env.REGION ?? 'us-east-1',
};
