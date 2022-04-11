import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { useForm } from '@inertiajs/inertia-react';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';
import Button from '@/Components/Button';
import Select from '@/Components/Select';

export default function Create(props: { auth: any; errors: any; }) {
    const { data, setData, post, processing, errors } = useForm({
        location: '',
        date: '',
        date_year: '',
        date_month: '',
        reasons: '',
    });

    const years = new Array();
    const yearNow = new Date().getFullYear();
    for (let addYear = 0; addYear <= 50; addYear++) {
        years.push({value: yearNow + addYear, label: yearNow + addYear});
        
    }
    const months = [
        {value: 0, label: "January"},
        {value: 1, label: "Feburary"},
        {value: 2, label: "March"},
        {value: 3, label: "April"},
        {value: 4, label: "May"},
        {value: 5, label: "June"},
        {value: 6, label: "July"},
        {value: 7, label: "August"},
        {value: 8, label: "September"},
        {value: 9, label: "October"},
        {value: 10, label: "November"},
        {value: 11, label: "December"},
    ];

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
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} data-testid="create-form">
                                <div className='mb-3'>
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
                                <div className='mb-3'>
                                    <label htmlFor="date">When do I plan to go there?</label>
                                    <div>
                                        <Select
                                            name='date_month'
                                            value={data.date_month}
                                            items={months.filter(month => month.value >= new Date().getMonth() || parseInt(data.date_year) > yearNow)}
                                            handleChange={e => setData("date_month", e.target.value)}
                                            className="mr-2"
                                        />
                                        <Select
                                            name='date_year'
                                            value={data.date_year}
                                            items={years}
                                            handleChange={e => setData("date_year", e.target.value)}
                                        />
                                    </div>
                                    {errors.date && <div className='text-red-700'>{errors.date}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="reasons">Why do I want to go there?</label>
                                    <Textarea
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
