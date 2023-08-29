import fetch from "node-fetch";

const GitHubApiEndpoint = "https://api.github.com";

export class Driver {
  findRepositoriesByOrganizationId(id: string): GithubRepo[] {
    return this.get(`/users/${id}/repos`);
  }

  findStargazersByRepositoryId(ownerId: string, id: string): User[] {
    return this.get(`/repos/${ownerId}/${id}/stargazers`);
  }

  get(path: string): any {
    return fetch(`${GitHubApiEndpoint}${path}`)
      .then(it => it.json());
  }
}

interface GithubRepo {
  name: string;
  full_name: string;
  private: boolean;
  owner: User;
  description: string;
  fork: false;
  stargazers_count: 0;
  watchers_count: 0;
}

interface User {
  login: string;
  id: number;
  avatar_url: string;
}
