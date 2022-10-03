import React, { createContext, Dispatch, useReducer } from 'react';
import { IProfile } from 'types';

const UserStateContext = createContext<IProfile | undefined>(undefined);
type Action =
  | { type: 'CREATE'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number };
type TodosDispatch = Dispatch<Action>;
const UserDispatchContext = createContext<TodosDispatch | undefined>(undefined);

const userReducers = (state: IProfile, action: Action): IProfile => {
  switch (action.type) {
    case 'CREATE':
      return state;
    default:
      throw new Error('unhandled action');
  }
};

const initializeValue: IProfile = {
  user: null,
  token: null,
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(userReducers, initializeValue);
  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};
