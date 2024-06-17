import type { NuxtError } from "#app";
import { faker } from "@faker-js/faker";

function createFakeNuxtError(error: Partial<NuxtError> = {}): NuxtError {
  return {
    fatal: error.fatal ?? faker.datatype.boolean(),
    unhandled: error.unhandled ?? faker.datatype.boolean(),
    statusCode: error.statusCode ?? faker.number.int(),
    message: error.message ?? faker.lorem.sentence(),
    name: error.name ?? faker.lorem.word(),
    toJSON: vi.fn(),
  };
}

export { createFakeNuxtError };