import { IMessage } from './index';
import { IUserConversation } from './userConversation.model';
export interface IConversation {
  id: string;
  startDate: string;
  topic: string;
  message: IMessage[];
  userConversation: IUserConversation[];
}
