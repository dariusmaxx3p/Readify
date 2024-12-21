"use client";

import { Features } from "@server/features/features/features.entity";
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";

export type AppContextState = {
  features: Features;
};

export enum AppContextActionType {
  SET_FEATURES = "SET_FEATURES",
}

export type AppContextAction = {
  type: AppContextActionType;
  payload: unknown;
};

export function appContextReducer(
  state: AppContextState,
  action: AppContextAction
): AppContextState {
  switch (action.type) {
    case AppContextActionType.SET_FEATURES:
      console.log(action.payload);
      return {
        ...state,
        features: action.payload as Features,
      };
    default:
      return state;
  }
}

export type AppContextType = {
  state: AppContextState;
  dispatch: Dispatch<AppContextAction>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(appContextReducer, {
    features: {
      allowChangeMode: false,
      allowChangeLocale: false,
    },
  });

  useEffect(() => {
    // fetch features
    fetch("/api/features")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: AppContextActionType.SET_FEATURES,
          payload: data.features,
        });
      });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
}
