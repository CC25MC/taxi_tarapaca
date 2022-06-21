import { request, requestMensajeria } from './base';
import {
  User,
  Auth,
  Agreements,
  Client,
  Automobiles,
  Service,
  Movements,
  Travel,
  Ws,
} from './services';

request.auth = Auth;
request.user = User;
request.agreements = Agreements;
request.client = Client;
request.automobiles = Automobiles;
request.service = Service;
request.movements = Movements;
request.travel = Travel;

requestMensajeria.ws = Ws;

export { request, requestMensajeria };
