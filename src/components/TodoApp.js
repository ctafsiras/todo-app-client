import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import auth from '../firebase.init';
import Task from './Task';

const TodoApp = () => {
    const [user] = useAuthState(auth);

    const { data: tasks, isLoading, refetch } = useQuery('tasks', () => fetch('https://todo-app-ctafsiras-server.herokuapp.com/tasks').then(res => res.json()))
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        fetch('https://todo-app-ctafsiras-server.herokuapp.com/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                toast.success('Task Added')
                refetch();
            })

        reset();

    };
    if (isLoading) {
        return <progress className="progress w-56"></progress>
    }
    return (
        <div>
            <h2 className='text-3xl my-3 font-bold text-primary'>ToDo App</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="New Task" className="input input-bordered w-full max-w-xs mt-3" {...register("task", { required: true })} /> <br />
                {errors.task && <p>This field is required</p>}
                <textarea className="textarea textarea-bordered w-full max-w-xs mt-3" placeholder="Task Description" {...register("description", { required: true })} /> <br />
                {errors.description && <p>This field is required</p>}

                <input className="btn w-full max-w-xs mt-3" type="submit" value='Add Task' />
            </form>
            <h2 className='text-2xl my-3 text-primary'>All The Tasks You Have..</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 mt-5'>
                {
                    tasks.slice(0).reverse().map(task => <Task
                        refetch={refetch}
                        key={task._id}
                        task={task}
                    ></Task>)
                }
            </div>
            <Toaster />
            {user && <button
                onClick={() => signOut(auth)}
                className="btn btn-outline btn-error mt-10">Logout</button>}
        </div>
    );
};

export default TodoApp;