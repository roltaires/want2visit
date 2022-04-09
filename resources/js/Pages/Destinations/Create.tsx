import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm } from '@inertiajs/inertia-react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';

export default function Dashboard(props: { auth: any; errors: any; }) {
    const { data, setData, post, processing, errors } = useForm({
        location: '',
        date: '',
        reasons: '',
    })

    function handleSubmit(e : React.FormEvent) {
        e.preventDefault();
        post('/destinations');
    }
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Destination</h2>}
        >
            <Head title="Create Destination" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div className='mb-2'>
                                    <label htmlFor="location">Location</label>
                                    <Input
                                        type="text"
                                        name="location"
                                        id="location"
                                        value={data.location}
                                        handleChange={e => setData('location', e.target.value)}
                                        className="w-full" />
                                    {errors.location && <div className='text-red-700'>{errors.location}</div>}
                                </div>
                                <div className='mb-2'>
                                    <label htmlFor="date">When do I plan to go there?</label>
                                    <Input
                                        type="text"
                                        name="date"
                                        id="date"
                                        value={data.date}
                                        handleChange={e => setData('date', e.target.value)}
                                        className="w-full" />
                                    {errors.date && <div className='text-red-700'>{errors.date}</div>}
                                </div>
                                <div className='mb-2'>
                                    <label htmlFor="reasons">Why do I want to go there?</label>
                                    <Input
                                        type="text"
                                        name="reasons"
                                        id="reasons"
                                        value={data.reasons}
                                        handleChange={e => setData('reasons', e.target.value)}
                                        className="w-full" />
                                    {errors.reasons && <div className='text-red-700'>{errors.reasons}</div>}
                                </div>
                                <Button type='submit' processing={processing}>
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
