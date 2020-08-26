export default function filterApiActions(reducer) {

  return (state, action) => {

    const reg = new RegExp("PENDING|SUCCESS|ERROR");
    const match = reg.exec(type);

    if (!match) return state;

    const split = type.split(/_(.+)/);
    const requestStatus = split[0];
    const requestName = split[1];
    const transformedAction = { ...action, type: requestStatus, requestName };

    return reducer(state, transformedAction);

  }
}