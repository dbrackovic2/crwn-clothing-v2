import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { auth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../utils/firebase/firebase.util";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    useEffect(() => {
        async function fetchData () {
            const response = await getRedirectResult(auth);
            console.log(response);
            if (response) {
                await createUserDocumentFromAuth(response.user);
            }
        }
        fetchData();
    }, []);

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for specified email');
                    break;
                case 'auth/user-not-found':
                    alert('No user found associated with specified email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

                <h3>Sign in via:</h3>
                <div className="buttons-container">
                    <Button type="submit">Email/pass</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Popup</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogleRedirect}>Google Redirect</Button>
                </div>
            </form>
            
        </div>
    )
}

export default SignInForm;
