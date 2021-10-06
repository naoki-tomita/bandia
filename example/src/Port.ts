import { OrganizationId, Repositories } from "./Domain";

export abstract class Port {
  abstract findRepositoriesByOrganizationId(id: OrganizationId): Promise<Repositories>;
}
