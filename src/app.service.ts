import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { TRANSCODE_QUEUE } from './constant/constant';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @InjectQueue(TRANSCODE_QUEUE)
    private readonly transcodeQueue: Queue
  ) {}

  async getHello() {
    const person = {
      name: 'Person one',
      age: 25,
    };
    // set item in cache
    await this.cacheManager.set('person', person, 10);

    // delete item in cache
    await this.cacheManager.del('person');

    // clear cache
    await this.cacheManager.reset();

    // get item from cache
    const cached = await this.cacheManager.get('person');

    console.log({ cached });

    return {
      message: 'Hello World!',
      data: cached,
    };
  }

  async transcode() {
    await this.transcodeQueue.add({
      filename: './file.mp3'
    }, {});
    return "transcode"
  }
}
