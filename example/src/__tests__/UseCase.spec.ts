import { mock } from "@kojiro.ueda/bandia";
import { when } from "jest-when";
import { OrganizationId, Repositories } from "../Domain";
import { Port } from "../Port";
import { UseCase } from "../UseCase";

describe("UseCase", () => {

  describe("#findStargazedRepositories", () => {
    it("should find stargazed repositories", async () => {
      const port = mock<Port>();
      const target = new UseCase(port);

      const id = mock<OrganizationId>();
      const repositories = mock<Repositories>();
      const filteredRepogitories = mock<Repositories>();

      when(port.findRepositoriesByOrganizationId).expectCalledWith(id).mockResolvedValueOnce(repositories);
      when(repositories.stargazedRepositories).expectCalledWith().mockReturnValueOnce(filteredRepogitories);

      await expect(target.findStargazedRepositories(id)).resolves.toBe(filteredRepogitories);

      expect(port.findRepositoriesByOrganizationId).toBeCalledWith(id);
      expect(repositories.stargazedRepositories).toBeCalledWith();
    });
  });
});
