import { AxiosRequestConfig } from 'axios';
import ApiQuery from '../api-query';
import { STORAGE_BASE_URL } from 'src/configs/constance';

export default class StorageQuery extends ApiQuery {
  constructor(config?: AxiosRequestConfig) {
    super(STORAGE_BASE_URL, config);
  }
}
