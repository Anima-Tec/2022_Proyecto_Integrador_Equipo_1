class ExampleSerializer {
  static deSerialize(data) {
    return {
      foo: data.foo,
      bar: data.bar,
    };
  }

  static serialize(example) {
    return {
      foo: example.foo,
      bar: example.bar,
    };
  }
}

export { ExampleSerializer };
