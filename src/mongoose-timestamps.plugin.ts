import { Schema } from 'mongoose';

export function addTimestampsToSchema(schema: Schema) {
  schema.set('timestamps', true);
}