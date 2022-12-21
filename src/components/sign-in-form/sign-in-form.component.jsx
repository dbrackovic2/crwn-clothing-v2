import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import { googleSignInStart, emailSignInStart, googleRedirectSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch()

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    }

    const signInRedirect = async () => {
        dispatch(googleRedirectSignInStart());
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
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
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

                <h3>Sign in via:</h3>
                <ButtonsContainer>
                    <Button type="submit">Email/pass</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Popup</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInRedirect}>Google Redirect</Button>
                </ButtonsContainer>
            </form>
            
        </SignInContainer>
    )
}

export default SignInForm;
