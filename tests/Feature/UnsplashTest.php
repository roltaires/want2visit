<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Unsplash;

class UnsplashTest extends TestCase
{
    public function test_can_connect_to_api()
    {
        $response = $this->getJson('/api/destination-photos/search?query=boracay');

        $response->assertStatus(200);
    }

    public function test_can_get_photo_results()
    {
        Unsplash\HttpClient::init([
            'applicationId'	=> env('UNSPLASH_ACCESS_KEY'),
            'secret'	=> env('UNSPLASH_SECRET_KEY'),
            'utmSource' => env('UNSPLASH_APPLICATION_NAME')
        ]);

        $search = "test";
        $page = 1;
        $per_page = 30;

        $results = Unsplash\Search::photos($search, $page, $per_page);

        $this->assertTrue(is_array($results->getResults()));
    }
}
