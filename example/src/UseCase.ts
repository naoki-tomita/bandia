import { OrganizationId, Repositories } from "./Domain";
import { Port } from "./Port";

export class UseCase {
  constructor(readonly port: Port) {}

  async findStargazedRepositories(id: OrganizationId): Promise<Repositories> {
    const repositories = await this.port.findRepositoriesByOrganizationId(id);
    return repositories.stargazedRepositories();
  }
}
