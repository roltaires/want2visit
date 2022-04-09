import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';

interface DestinationListProps {
    auth: any;
    errors: any;
    destinations: [{
        id: number;
        location: string;
        date: string;
    }];
}

export default function DestinationList(props: DestinationListProps) {
    const route = (window as any).route;
    
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Destinations</h2>}
        >
            <Head title="Destinations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className='text-right mb-2'>
                                <Link href={route('destinations.create')}>
                                    <Button>Add New</Button>
                                </Link>
                            </div>

                            <table className="table-auto horder-collapse border border-slate-400 w-full">
                                <thead>
                                    <tr>
                                        <th className="border border-slate-300 bg-slate-100 text-left p-2">Location</th>
                                        <th className="border border-slate-300 bg-slate-100 text-left p-2">When</th>
                                        <th className="border border-slate-300 bg-slate-100 text-left p-2 w-1/6"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.destinations.length > 0 && (
                                        props.destinations.map((destination) => 
                                            <tr key={destination.id} className="border border-slate-300">
                                                <td className='border border-slate-300 p-2'>{destination.location}</td>
                                                <td className='border border-slate-300 p-2'>{destination.date}</td>
                                                <td className='border border-slate-300 p-2 text-center'>
                                                    <Link href={route('destinations.edit', destination.id)} className="mr-2">
                                                        <Button className='bg-lime-600'>Edit</Button>
                                                    </Link>
                                                    <Link href={route('destinations.delete', {id: destination.id})} method="delete" as="button" type="button">
                                                        <Button className='bg-red-600'>Delete</Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                    {props.destinations.length < 1 && (
                                        <tr><td colSpan={3} className='border border-slate-300 p-2 text-center'>Add your destinations now!</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
