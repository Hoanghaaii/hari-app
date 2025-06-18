export class OAuthProvider {
  constructor(
    public readonly id: number,
    public name: string,
    public clientId: string,
    public clientSecret: string,
    public redirectUri: string,
    public scope: string,
    public authUrl: string,
    public tokenUrl: string,
    public userInfoUrl: string,
    public isActive: boolean = true,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
