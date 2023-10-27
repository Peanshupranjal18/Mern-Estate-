import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    // navigate
    const navigate = useNavigate();
    // function is async because google will respond
    const handleGoogleClick = async () => {
        try {
            // provider
            const provider = new GoogleAuthProvider();
            // auth exported app from firebase.js
            const auth = getAuth(app);
            // sign in with pop up
            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // ye console mein dikh jata h kya ho rha h 
                    // usse ye pata chala ki ye backend ko dena h
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            // convert into json
            const data = await res.json();
            dispatch(signInSuccess(data));
            // navigate to the home page
            navigate('/');
        } catch (error) {
            // console log for error
            console.log('could not sign in with google', error);
        }
    };
    // button design
    return (
        <button
            onClick={handleGoogleClick} // action
            type='button' // change to button in order to not submit 
            // the form
            className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
        >
            Continue with Google
        </button>
    );
}