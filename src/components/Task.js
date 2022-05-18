import React from 'react';
import toast from 'react-hot-toast';

const Task = ({ task, refetch }) => {
    const handleDelete = () => {
        fetch(`http://localhost:4000/task/${task._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("Delete Success")
                    refetch();
                }
            })

    }
    const handleComplete = () => {
        const newTask = {
            task: task.task,
            complete: true,
            description: toast.description
        }
        fetch(`http://localhost:4000/task/${task._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Task Completed")
                    refetch();
                }
            })

    }
    return (
        <div className="card w-96 bg-neutral text-neutral-content mx-auto">
            <div className="card-body items-center text-center">
                <h2 className={task.complete ? `card-title line-through` : `card-title`}>{task.task}</h2>
                <p>{task.description}</p>
                <div className="card-actions justify-end">
                    <button
                        onClick={handleComplete}
                        disabled={task.complete}
                        className="btn btn-primary">Complete</button>
                    <button
                        onClick={handleDelete}
                        className="btn btn-error">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Task;