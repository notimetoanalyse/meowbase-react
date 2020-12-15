// import React, { useState, useContext, useEffect } from 'react';
// import { auth } from '../firebase';

// export function useAuth() {
//   return useContext(AuthContext);
// }

// const AuthContext = React.createContext();

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   function signUp(email, pass) {
//     return auth.createUserWithEmailAndPassword(email, pass);
//   }

//   function signIn(email, pass) {
//     console.log(auth.signInWithEmailAndPassword(email, pass))
//   }

//   function logOut() {
//     return auth.signOut();
//   }

//   function resetPassword(email) {
//     return auth.sendPasswordResetEmail(email);
//   }

//   function updateEmail(email) {
//     return currentUser.updateEmail(email);
//   }

//   function updatePassword(password) {
//     return currentUser.updatePassword(password);
//   }

//   const value = {
//     currentUser,
//     signUp,
//     signIn,
//     logOut,
//     resetPassword,
//     updateEmail,
//     updatePassword,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }
