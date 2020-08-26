import { CREATE_GLOBAL_MESSAGE, DELETE_GLOBAL_MESSAGE } from "../actions/globalMessages";

const initialState = {
  messageBacklog: [],
  visibleMessage: undefined,
}

export default (state = initialState, { type, message, severity }) => {
  switch (type) {

    case DELETE_GLOBAL_MESSAGE:
      const visibleMessage = (state.messageBacklog.length > 0) ? state.messageBacklog[0] : undefined;
      return { visibleMessage, messageBacklog: state.messageBacklog.slice(1) };

    case CREATE_GLOBAL_MESSAGE:
      {let messageBacklog = [...state.messageBacklog, { text: message, severity }];
      const visibleMessage = state.visibleMessage === undefined ? messageBacklog.shift() : state.visibleMessage;
        return { visibleMessage, messageBacklog };}
    default:
      return state;
  }

}
