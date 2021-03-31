export default interface IHashProvider {
  compare(payload: string, hashed: string): Promise<boolean>;
  generate(payload: string): Promise<string>;
}
