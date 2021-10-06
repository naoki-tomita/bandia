import { mock } from "@kojiro.ueda/bandia";
import { when } from "jest-when";
import { OrganizationId, Repositories } from "../Domain";
import { Port } from "../Port";
import { UseCase } from "../UseCase";

describe("UseCase", () => {
  const port = mock<Port>();
  const usecase = new UseCase(port);

  describe("#findStargazedRepositories", () => {
    it("should find stargazed repositories", async () => {
      const id = mock<OrganizationId>();
      const repositories = mock<Repositories>();
      const filteredRepogitories = mock<Repositories>();

      when(port.findRepositoriesByOrganizationId).calledWith(id).mockResolvedValueOnce(repositories);
      when(repositories.stargazedRepositories).calledWith().mockReturnValueOnce(filteredRepogitories);

      await expect(usecase.findStargazedRepositories(id)).resolves.toBe(filteredRepogitories);

      expect(port.findRepositoriesByOrganizationId).toBeCalledWith(id);
      expect(repositories.stargazedRepositories).toBeCalledWith();
    });
  });
});
