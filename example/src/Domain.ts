abstract class FCC<T> {
  constructor(readonly values: T[]) {}
}

export class OrganizationId {
  constructor(readonly value: string) {}
}

export class UserId extends OrganizationId {}

export class Repositories extends FCC<Repository> {
  stargazedRepositories(): Repositories {
    throw Error();
  }
}
export class RepositoryId {
  constructor(readonly value: string) {}
}
export class Repository {
  constructor(readonly id: RepositoryId, readonly stargazers: Users) {}
}

export class Users extends FCC<User> {}
export class User {
  constructor(readonly id: UserId) {}
}
