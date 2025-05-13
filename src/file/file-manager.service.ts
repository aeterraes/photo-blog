import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileManagerService {
  private s3: S3Client;
  private readonly bucket: string;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('YANDEX_S3_REGION'),
      endpoint: this.configService.get<string>('YANDEX_S3_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.get<string>('YANDEX_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('YANDEX_S3_SECRET_KEY'),
      },
    });
    this.bucket = this.configService.get<string>('YANDEX_S3_BUCKET')!;
  }

  async uploadFile(
    buffer: Buffer,
    filename: string,
    mimetype: string,
  ): Promise<string> {
    const uniqueFilename = `${Date.now()}-${filename}`;
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: uniqueFilename,
      Body: buffer,
      ContentType: mimetype,
    });

    await this.s3.send(command);
    return `${this.configService.get('YANDEX_S3_ENDPOINT')}/${this.bucket}/${uniqueFilename}`;
  }
}
