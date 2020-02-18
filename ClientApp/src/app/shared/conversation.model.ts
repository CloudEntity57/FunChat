import { IMessage } from './index';
export interface IConversation {
  id: string;
  startDate: string;
  topic: string;
  message: IMessage[];
}
