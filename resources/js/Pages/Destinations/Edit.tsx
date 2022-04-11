import React, { useCallback, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';
import Button from '@/Components/Button';
import Select from '@/Components/Select';

interface IEditProps {
    auth: any;
    errors: any;
    destination: {
        id: number;
        location: string;
        date: string;
        date_month: string | number;
        date_year: string;
        reasons: string;
    }
}

type SearchResultType = {
    total: number;
    totalPages: number;
    photos: {
        unspash_id: string;
        raw_url: string;
        full_url: string;
        regular_url: string;
        small_url: string;
        small_s3_url: string;
        unsplash_user_id: string;
        unsplash_user_name: string;
        unsplash_user_first_name: string;
        unsplash_user_last_name: string;
        unsplash_user_link_html: string;
    }[];
}

export default function Edit(props: IEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        id: props.destination.id,
        location: props.destination.location || '',
        date: props.destination.date || '',
        date_month: props.destination.date_month || '',
        date_year: props.destination.date_year || '',
        reasons: props.destination.reasons || '',
    })
    const axios = (window as any).axios;
    const route = (window as any).route;
    const [searchResults, setSearchResults] = useState<SearchResultType>();

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
        put(`/destinations/${data.id}`);
    }

    function searchPhotos () {
        const searchKey = data.location;

        axios.get(
            route('destination-photos.search'),
            {params: {query: searchKey}}
        )
        .then((response: any) => {
            setSearchResults(response.data);
        }).catch((err: any) => {
            console.log(err);
        });
    }
    searchPhotos();

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <div className='flex'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight w-1/2">Edit  Destination</h2>
                    <div className='w-1/2 text-right'>
                        <Link href={route('destinations.create')}>
                            <Button>Add New</Button>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Edit Destination" />

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
                                <div className='mb-2'>
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
                    <div className="mt-4 bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className='text-center text-xl font-semibold'>
                                Photos Inspirations 
                                <span className="text-sm font-normal"> (Powered by <a href='https://unsplash.com/?utm_source=your_app_name&utm_medium=referral' target='_blank' className='underline'>Unsplash</a>)</span>
                            </h2>
                            <div className='search-results w-full relative'>
                                <div className='search-results-box w-full p-6 sm:rounded-lg transition ease-in-out overflow-auto columns-3 gap-3'>
                                    {searchResults?.photos.map(photo => <div className='image-result w-full mb-3' key={photo.unspash_id}>
                                        <img src={photo.small_url} className="w-full" />
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
