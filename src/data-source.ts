import { DataSource } from 'typeorm';
import { dataSourceOptions } from './db-config.service';

export const AppDataSource = new DataSource(dataSourceOptions);
