import React from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import Task from './Task';

const TodoApp = () => {
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="New Task" className="input input-bordered w-full max-w-xs mt-3" {...register("task", { required: true })} /> <br />
                <textarea className="textarea textarea-bordered w-full max-w-xs mt-3" placeholder="Task Description" {...register("description", { required: true })} /> <br />
                {errors.exampleRequired && <span>This field is required</span>}

                <input className="btn w-full max-w-xs mt-3" type="submit" />
            </form>
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
        </div>
    );
};

export default TodoApp;