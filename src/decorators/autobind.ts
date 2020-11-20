namespace App {
  // auto-binding decorator
  export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    // "_" means that I won't use it but need it as an argument.
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }
}
