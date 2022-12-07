import React, { 
  createContext, 
  useContext,
  useEffect,
  useState,
  useMemo 
} from 'react'
import * as Google from 'expo-google-app-auth'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from '@firebase/auth'

import { auth } from '../firebase'



const AutoContext = createContext ({

})

const config = {
  androidClientId: '229720403671-9krgi1f277q2h19kqi5nqa1lsoub4vf8.apps.googleusercontent.com',
  iosClientId: '229720403671-medag5sn047jg3jdtg2u8uak3fl8loe7.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  permissions: ['public_profile', 'email', 'gender', 'location'],
}

export const AuthProvider = ({children}) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);


  useEffect(
    () =>
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Logged in
        setUser(user);
      } else {
        // Not logged in ...
        setUser(null);
      }

      setLoadingInitial(false);
    }), []
  )

  const logout = () => {
    setLoading(true);

    signOut(auth)
    .catch((error) => setError(error))
    .finally(() => setLoading(false));
  };


  const signInWithGoogle = async() => {
    setLoading(true);

    Google.logInAsync(config).then(async (logInResult) => {
      if (logInResult.type === 'success') {
        //login ...
        const { idToken, accesToken } = logInResult;
        const credential = GoogleAuthProvider.credential(
          idToken,
          accesToken
        );

        await signInWithCredential(auth, credential)
       }

       return Promise.reject();
    })
    .catch((error) => setError(error))
    .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout
    }), [user, loading, error]
  )
  return (
    <AutoContext.Provider 
        value={memoedValue}>
        {!loadingInitial && children}
    </AutoContext.Provider>
  )
}

export default function useAuth() {
    return useContext(AutoContext);
}

