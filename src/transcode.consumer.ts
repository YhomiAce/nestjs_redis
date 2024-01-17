import { Process, Processor } from '@nestjs/bull';
import { TRANSCODE_QUEUE } from './constant/constant';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor(TRANSCODE_QUEUE)
export class TranscodeConsumer {
  private readonly logger = new Logger(TranscodeConsumer.name);
  @Process()
  async transcode(job: Job<unknown>) {
    this.logger.debug(`Transcoding message: ${job.id}`);
    this.logger.debug('Data: ',job.data);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 9000));
    this.logger.debug(`Transcoding complete for Job: ${job.id}`);
  }
}
