interface SubscribeListener {
  (): void;
}

interface Store<S, A> {
  getState: () => S;
  subscribe: (listener: SubscribeListener) => SubscribeListener[];
  dispatch: (action: A) => void;
}

interface Reducer<S, A> {
  (state: S, action: A): S;
}

export interface ReducerAction<T> {
  type: T;
}

export interface ReducerPayloadAction<T, U> extends ReducerAction<T> {
  payload: U;
}

export const createStore = <S, A>(reducer: Reducer<S, A>): Store<S, A> => {
  let state: S;
  const listeners: SubscribeListener[] = [];

  const getState = (): S => state;
  const subscribe = (listener: SubscribeListener) => {
    listeners.push(listener);
    return listeners.filter(filterListener => filterListener !== listener);
  };

  const dispatch = (action: A): void => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  dispatch({} as A);

  return { getState, subscribe, dispatch };
};
