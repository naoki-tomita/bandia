import { OrganizationId, Repositories } from "./Domain";
import { Port } from "./Port";

export class Gateway implements Port {
  findRepositoriesByOrganizationId(id: OrganizationId): Promise<Repositories> {
    throw new Error("Method not implemented.");
  }
}
