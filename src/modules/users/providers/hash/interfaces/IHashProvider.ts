export default interface IHashProvider {
  compare(payload: string, hashed: string): Promise<boolean>;
  generated(payload: string): Promise<string>;
}
