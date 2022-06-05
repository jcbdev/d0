type queryFragment = {
  token: string;
  value: string;
};

class QueryBuilder {
  protected queryFragments: queryFragment[];

  constructor(queryFragments?: queryFragment[]) {
    this.queryFragments = queryFragments;
  }
}

class FunctionQueryBuilder extends QueryBuilder {
  constructor(queryFragments?: queryFragment[]) {
    super(queryFragments ?? []);
  }

  where((Fu))
  byName((name: string) => boolean) {

  }
  // name((_: ValueQueryBuilder) => ValueQueryBuilder) {
  //   this.queryFragments.push({
  //     token: 'name',
  //     value: name,
  //   });
  //   return new ValueQueryBuilder(this.queryFragments);
  // }
}

class CombinatorQueryBuilder<T extends QueryBuilder> extends QueryBuilder {
  #qbType: new (queryFragments?: queryFragment[]) => T;
  constructor(TCreator: new (queryFragments?: queryFragment[]) => T, queryFragments?: queryFragment[]) {
    super(queryFragments);
    this.#qbType = TCreator;
  }

  And() {
    this.queryFragments.push({
      token: 'and',
      value: null,
    });
    return new this.#qbType(this.queryFragments);
  }

  Or() {
    this.queryFragments.push({
      token: 'or',
      value: null,
    });
    return new this.#qbType(this.queryFragments);
  }
}

class ValueQueryBuilder<T extends QueryBuilder> extends QueryBuilder {
  constructor(queryFragments?: queryFragment[]) {
    super(queryFragments);
  }

  equals(value: any) {
    this.queryFragments.push({
      token: 'equals',
      value: value,
    });
    return new CombinatorQueryBuilder(this.#qbType, this.queryFragments);
  }

  notEquals(value: any) {
    this.queryFragments.push({
      token: 'notEquals',
      value: value,
    });
    return new this.#qbType(this.queryFragments);
  }

  greaterThan(value: any) {
    this.queryFragments.push({
      token: 'greaterThan',
      value: value,
    });
    return new this.#qbType(this.queryFragments);
  }

  lessThan(value: any) {
    this.queryFragments.push({
      token: 'lessThan',
      value: value,
    });
    return new this.#qbType(this.queryFragments);
  }

  contains(value: any) {
    this.queryFragments.push({
      token: 'contains',
      value: value,
    });
    return new this.#qbType(this.queryFragments);
  }
}

let test = new FunctionQueryBuilder().name("Test").