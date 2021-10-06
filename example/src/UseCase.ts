import { OrganizationId, Repositories } from "./Domain";
import { Port } from "./Port";

export class UseCase {
  constructor(readonly port: Port) {}

  async findStargazedRepositories(organization: OrganizationId): Promise<Repositories> {
    throw Error();
  }
}
