abstract class FCC<T> {
  constructor(readonly values: T[]) {}
}

export class OrganizationId {
  constructor(readonly value: string) {}
}

export class Repositories extends FCC<Repository> {
  stargazedRepositories(): Repositories {
    throw Error();
  }
}
export class RepositoryId {
  constructor(readonly value: string) {}
}
export class Repository {
  constructor(readonly id: RepositoryId, readonly stargazersCount: Stargazer) {}
}

export class Stargazers extends FCC<Stargazer> {}
export class Stargazer {
  constructor(readonly id: OrganizationId) {}
}
