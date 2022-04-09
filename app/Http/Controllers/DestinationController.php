<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Destination;
use Inertia\Inertia;

class DestinationController extends Controller
{
    public function index(Request $request)
    {
        $destinations = Destination::query();

        $sorts = $request->sorts;

        if ($sorts) {
            foreach ($sorts as $sort) {
                [$orderField, $orderBy] = explode('|',$sort);

                $destinations->orderBy($orderField, $orderBy);
            }
        }

        $destinations = $destinations->get();

        return Inertia::render('Destinations/List', array_merge([
            'destinations' => $destinations], $request->input()
        ));
    }

    public function create()
    {
        return Inertia::render('Destinations/Create');
    }

    public function show($id)
    {
        # code...
    }

    public function store(Request $request)
    {
        $request->validate([
            'location' => 'required'
        ]);

        $destination = new Destination;
        $destination->location = $request->location;
        $destination->date = $request->date;
        $destination->reasons = $request->reasons;
        $destination->save();

        return redirect()->route('destinations.edit', $destination->id);
    }

    public function edit($id)
    {
        $destination = Destination::find($id);

        return Inertia::render('Destinations/Edit', [
            'destination' => $destination
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'location' => 'required'
        ]);

        $destination = Destination::find($id);
        $destination->location = $request->location;
        $destination->date = $request->date;
        $destination->reasons = $request->reasons;
        $destination->save();

        return redirect()->route('destinations.edit', $destination->id);
    }

    public function delete($id)
    {
        $destination = Destination::find($id);
        $destination->delete();

        return redirect()->route('destinations.index');
    }
}
