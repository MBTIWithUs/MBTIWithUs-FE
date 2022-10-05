import { authState } from '@atoms/auth';
import api from '@libs/api';
import React, { createContext, Dispatch, useEffect, useReducer } from 'react';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';
import { IProfile, IToken, IUser } from 'types';

export const UserStateContext = createContext<IProfile | undefined>(undefined);
type Action =
  | { type: 'LOGIN'; token: IToken }
  | { type: 'SET_USER'; user: IUser }
  | { type: 'LOGOUT' };
type TodosDispatch = Dispatch<Action>;
export const UserDispatchContext = createContext<TodosDispatch | undefined>(
  undefined,
);

const userReducers = (state: IProfile, action: Action): IProfile => {
  switch (action.type) {
    case 'LOGIN':
      return { user: state.user, token: action.token };
    case 'SET_USER':
      return { token: state.token, user: action.user };
    case 'LOGOUT':
      return initializedValue;
    default:
      throw new Error('unhandled action');
  }
};

const initializedValue: IProfile = {
  user: null,
  token: null,
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useRecoilState(authState);
  const [state, dispatch] = useReducer(userReducers, initializedValue);

  if (state.token) {
    setToken(state.token);
  }

  if (!state.token && token) {
    dispatch({ type: 'LOGIN', token });
  }

  const { data, mutate, error } = useSWR<IUser>(
    typeof window === 'undefined' || !state.token || state.user
      ? null
      : '/api/v1/user',
    (url) =>
      api
        .get(url, {
          headers: {
            Authorization: state.token
              ? `Bearer ${state.token?.access_token}`
              : '',
          },
        })
        .then((res) => res.data),
  );

  const refresh = async () => {
    try {
      const res = await api.post<IToken>(`/api/v1/auth/jwt/accessToken`, null, {
        headers: {
          Authorization: state.token
            ? `Bearer ${state.token?.refresh_token}`
            : '',
        },
      });
      setToken(res.data);
      dispatch({ type: 'LOGIN', token: res.data });
      mutate();
    } catch (e) {
      dispatch({ type: 'LOGOUT' });
    }
  };

  if (error?.response?.status === 403) {
    console.warn('refresh running!');

    refresh();
  }

  useEffect(() => {
    if (data) {
      dispatch({ type: 'SET_USER', user: data });
    }
  }, [data]);

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};
