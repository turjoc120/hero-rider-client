import axios from "axios";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import initApp from "../Components/Pages/Firebase/firebase.init";

initApp()

const useFirebase = () => {
    const [user, setUser] = useState({})
    const [errMess, setError] = useState('')
    const [isLoading, setLoading] = useState(true)



    const auth = getAuth();

    const registerUser = (email, password, name, history) => {
        setLoading(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError(" ")
                const newUser = { email, displayName: name }
                setUser(newUser)

                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {

                }).catch((error) => {

                });

                history.replace('/dashboard');

            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => setLoading(false))
    }

    // learner 
    const registerLearner = (email, password, name, history) => {
        setLoading(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError(" ")
                const newUser = { email, displayName: name }
                setUser(newUser)
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                history.replace('/learner-page');
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => setLoading(false))
    }



    const logInUser = (email, password, location, history) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError("")
                history.replace('/');
            })
            .catch((error) => {
                setError(error.message)
            }).finally(() => setLoading(false))
    }



    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
            setLoading(false)
        });
        return () => unsubscribed
    }, [])


    const logOut = () => {
        signOut(auth).then(() => {

        }).catch((error) => {

        });
    }

    return {
        registerLearner,
        isLoading,
        logOut,
        errMess, setError,
        user,
        registerUser, logInUser,
    }


}

export default useFirebase;