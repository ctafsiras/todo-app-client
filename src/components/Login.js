import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import auth from '../firebase.init';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    }
    if (loading) {
        return <progress className="progress w-56"></progress>
    }
    if (user) {
        return <Navigate to='/'></Navigate>
    }
    return (
        <div className='mt-10'>
            <h3 className='text-3xl text-primary'>Login Here</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='email' placeholder="Enter Email" className="input input-bordered w-full max-w-xs mt-3" {...register("email", { required: true })} /> <br />
                {errors.email && <p>This field is required</p>}
                <input type='password' placeholder="Enter Password" className="input input-bordered w-full max-w-xs mt-3" {...register("password", { required: true })} /> <br />
                {errors.password && <p>This field is required</p>}
                {error && <p>{error.message}</p>}

                <input className="btn w-full max-w-xs mt-3" type="submit" value={'LOGIN'} />
            </form>
            <p className='mt-2'>New to ToDo App? <Link className='text-blue-700' to='/register'>Create an account</Link></p>
        </div>
    );
};

export default Login; <h3>Login</h3>