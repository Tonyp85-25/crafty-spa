import { AuthGateway } from "../model/auth.gateway";

export class FakeAuthGateway implements AuthGateway {
  authUser!: string;

  getAuthUser() {
    return this.authUser;
  }
}

export const authGateway = new FakeAuthGateway();
