<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DestinationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/* Destinations */
Route::controller(DestinationController::class)
->prefix('destinations')
->name('destinations.')
->middleware(['auth'])
->group(function() {
    Route::get('/', 'index')->name('index');
    Route::get('/create', 'create')->name('create');
    Route::get('/{id}', 'show')->name('show');
    Route::post('/', 'store')->name('store');
    Route::get('/edit/{id}', 'edit')->name('edit');
    Route::put('/{id}', 'update')->name('update');
    Route::delete('/{id}', 'delete')->name('delete');
});

require __DIR__.'/auth.php';
