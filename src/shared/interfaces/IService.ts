export default interface IService<T> {
  execute(params?: unknown): Promise<T>;
}
