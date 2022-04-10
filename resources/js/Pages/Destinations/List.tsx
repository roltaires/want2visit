import React, { ChangeEvent, useCallback, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import { Inertia } from '@inertiajs/inertia';

interface DestinationListProps {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    errors: {};
    destinations: [{
        id: number;
        location: string;
        date: string;
        date_month: number;
        date_year: string;
        reasons: string;
    }];
    sorts: [string];
}

export default function DestinationList(props: DestinationListProps) {
    const route = (window as any).route;
    let sorts = props.sorts || new Array;
    const [searchKey, setSearchkey] = useState('');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function getSortingClass(field: string) {
        const index = sorts.findIndex(sort => sort.indexOf(field+'|') > -1);

        if (index > -1) {
            const sortString = sorts[index];
            const [fieldName, sortBy] = sortString.split('|');

            return `sort-${sortBy}`;
        }

        return '';
    }

    function sort(e : React.MouseEvent<HTMLTableCellElement, MouseEvent>, field : string) {
        if(sorts.length > 1 && !e.ctrlKey) {
            sorts = [field+'|asc'];
        } else if(sorts.indexOf(field+'|asc') > -1) {
            sorts[sorts.indexOf(field+'|asc')] = field+'|desc';
        } else if (sorts.indexOf(field+'|desc') > -1) {
            sorts.splice(sorts.indexOf(field+'|desc'),1);
        } else if (e.ctrlKey){
            sorts.push(field+'|asc');
        } else {
            sorts = [field+'|asc'];
        }
        
        Inertia.get(route('destinations.index'), {sorts});
    }

    function filteredDestinations() {
        const destinations = props.destinations;    
        const processedSearchKey = searchKey.toLowerCase().trim();
        if (searchKey.length > 0) {
            return destinations.filter(destination =>
                (destination.location && destination.location.toLowerCase().indexOf(processedSearchKey) > -1) ||
                (destination.reasons && destination.reasons.toLowerCase().indexOf(processedSearchKey) > -1) || 
                (destination.date && destination.date.toLowerCase().indexOf(processedSearchKey) > -1)
            );
        }

        return destinations;
    }

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
                            <div className='flex items-center mb-2'>
                                <div className="w-3/4">
                                    <Input
                                        type="text"
                                        name="searchKey"
                                        value={searchKey}
                                        handleChange={e => setSearchkey(e.currentTarget.value)}
                                        className="w-full"
                                        placeholder="Search your destinations"
                                    />
                                </div>
                                <div className="w-1/4 text-right">
                                    <Link href={route('destinations.create')}>
                                        <Button>Add New</Button>
                                    </Link>
                                </div>
                            </div>

                            <table className="table-auto horder-collapse border border-slate-400 w-full">
                                <thead>
                                    <tr>
                                        <th className={"border border-slate-300 bg-slate-100 text-left p-2 cursor-pointer w-2/12 sortable "+getSortingClass('location')} onClick={e => sort(e, 'location')}>Location</th>
                                        <th className={"border border-slate-300 bg-slate-100 text-left p-2 cursor-pointer w-2/12 sortable "+getSortingClass('date')} onClick={e => sort(e, 'date')}>When</th>
                                        <th className="border border-slate-300 bg-slate-100 text-left p-2 w-5/12">Why</th>
                                        <th className="border border-slate-300 bg-slate-100 text-left p-2 w-2/12"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDestinations().length > 0 && (
                                        filteredDestinations().map((destination) => 
                                            <tr key={destination.id} className="border border-slate-300">
                                                <td className='border border-slate-300 p-2'>{destination.location}</td>
                                                <td className='border border-slate-300 p-2'>{destination.date_year}, {months[destination.date_month]}</td>
                                                <td className='border border-slate-300 p-2 truncate text-ellipsis text-clip'>{destination.reasons}</td>
                                                <td className='border border-slate-300 p-2 text-center'>
                                                    <Link href={route('destinations.edit', destination.id)} className="mr-2">
                                                        <Button className='bg-lime-600'>Edit</Button>
                                                    </Link>
                                                    <Link href={route('destinations.delete', {id: destination.id})} method="delete" as="button" className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 bg-red-600'>
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                    {filteredDestinations().length < 1 && searchKey.length > 0 && 
                                        <tr><td colSpan={4} className='border border-slate-300 p-2 text-center'>No results found</td></tr>
                                    }
                                    {props.destinations.length < 1 && 
                                        <tr><td colSpan={4} className='border border-slate-300 p-2 text-center'>Add your destinations now!</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
