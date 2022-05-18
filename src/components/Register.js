import React from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import auth from '../firebase.init';

const Register = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        createUserWithEmailAndPassword(data.email, data.password);
    }
    if (loading) {
        return <progress className="progress w-56"></progress>
    }
    if (user) {
        return <Navigate to='/'></Navigate>
    }
    return (
        <div className='mt-10'>
            <h3 className='text-3xl text-primary'>Register Here</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' placeholder="Enter Name" className="input input-bordered w-full max-w-xs mt-3" {...register("name", { required: true })} /> <br />
                {errors.name && <p>This field is required</p>}
                <input type='email' placeholder="Enter Email" className="input input-bordered w-full max-w-xs mt-3" {...register("email", { required: true })} /> <br />
                {errors.email && <p>This field is required</p>}
                <input type='password' placeholder="Enter Password" className="input input-bordered w-full max-w-xs mt-3" {...register("password", { required: true })} /> <br />
                {errors.password && <p>This field is required</p>}
                {error && <p>{error.message}</p>}

                <input className="btn w-full max-w-xs mt-3" type="submit" value={'Register'} />
            </form>
            <p className='mt-2'>Already have account? <Link className='text-blue-700' to='/login'>Login Now</Link></p>
        </div>
    );
};

export default Register; 