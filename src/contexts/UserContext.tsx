import { authState } from '@atoms/auth';
import api from '@libs/api';
import React, { createContext, Dispatch, useEffect, useReducer } from 'react';
import { useRecoilState } from 'recoil';
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
      return { user: state.user, token: action.token, userLoading: false };
    case 'SET_USER':
      return { token: state.token, user: action.user, userLoading: false };
    case 'LOGOUT':
      return { ...initializedValue, userLoading: false };
    default:
      throw new Error('unhandled action');
  }
};

const initializedValue: IProfile = {
  user: null,
  token: null,
  userLoading: true,
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(userReducers, initializedValue);
  // const [token, setToken] = useRecoilState(authState);

  // if (state.token) {
  //   setToken(state.token);
  // }

  // if (!state.token && token) {
  //   dispatch({ type: 'LOGIN', token });
  // }

  // const { data, mutate, error } = useSWR<IUser>(
  //   typeof window === 'undefined' || !state.token || state.user
  //     ? null
  //     : '/api/v1/user',
  //   (url) =>
  //     api
  //       .get(url, {
  //         headers: {
  //           Authorization: state.token
  //             ? `Bearer ${state.token?.access_token}`
  //             : '',
  //         },
  //       })
  //       .then((res) => res.data),
  //   {
  //     revalidateOnFocus: false,
  //     revalidateOnMount: false,
  //     refreshInterval: 0,
  //     revalidateIfStale: false,
  //     errorRetryCount: 2,
  //   },
  // );

  // const refresh = async () => {
  //   try {
  //     const res = await api.post<IToken>(`/api/v1/auth/jwt/accessToken`, null, {
  //       headers: {
  //         Authorization: state.token
  //           ? `Bearer ${state.token?.refresh_token}`
  //           : '',
  //       },
  //     });
  //     setToken(res.data);
  //     dispatch({ type: 'LOGIN', token: res.data });
  //     mutate();
  //   } catch (e) {
  //     dispatch({ type: 'LOGOUT' });
  //   }
  // };

  // useEffect(() => {
  //   if (data) {
  //     dispatch({ type: 'SET_USER', user: data });
  //   } else if (error?.response?.status === 401) {
  //     // refresh();
  //     setToken(null);

  //     dispatch({ type: 'LOGOUT' });
  //   }
  //   console.log(error);
  // }, [data, error]);
  const [token, setToken] = useRecoilState(authState);

  const handleTokenChange = async () => {
    if (!state.user && token) {
      dispatch({ type: 'LOGIN', token });
      api
        .get(`/api/v1/user`, {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        })
        .then(({ data: user }) => dispatch({ type: 'SET_USER', user }))
        .catch(({ response }) => {
          if (response.status === 401) {
            if (
              new Date().getTime() <
              token.server_current_time + Number(token.refresh_token_expires_in)
            ) {
              api
                .get(`/api/v1/user`, {
                  headers: {
                    Authorization: `Bearer ${token.refresh_token}`,
                  },
                })
                .then(({ data: user }) => dispatch({ type: 'SET_USER', user }))
                .catch(() => {
                  setToken(null);
                });
            } else {
              setToken(null);
            }
          }
        });
    } else if (!token) {
      dispatch({ type: 'LOGOUT' });
    }
  };

  useEffect(() => {
    handleTokenChange();
  }, [token]);

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};
