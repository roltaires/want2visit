<?php

namespace App\Http\Controllers\APIController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Unsplash;

class DestinationPhotosAPIController extends Controller
{
    public function search(Request $request)
    {
        Unsplash\HttpClient::init([
            'applicationId'	=> env('UNSPLASH_ACCESS_KEY'),
            'secret'	=> env('UNSPLASH_SECRET_KEY'),
            'utmSource' => env('UNSPLASH_APPLICATION_NAME')
        ]);

        $search = $request->input('query');
        $page = 1;
        $per_page = 30;

        $results = Unsplash\Search::photos($search, $page, $per_page);

        $formattedResults = [
            'total' => $results->getTotal(),
            'totalPages' => $results->getTotalPages(),
            'photos' => array()
        ];

        foreach ($results->getResults() as $rawPhotoResult) {
            $formattedResults['photos'][] = [
                'unspash_id' => $rawPhotoResult['id'],
                'raw_url' => $rawPhotoResult['urls']['raw'],
                'full_url' => $rawPhotoResult['urls']['full'],
                'regular_url' => $rawPhotoResult['urls']['regular'],
                'small_url' => $rawPhotoResult['urls']['small'],
                'small_s3_url' => $rawPhotoResult['urls']['small_s3'],
                'unsplash_user_id' => $rawPhotoResult['user']['id'],
                'unsplash_user_name' => $rawPhotoResult['user']['name'],
                'unsplash_user_first_name' => $rawPhotoResult['user']['first_name'],
                'unsplash_user_last_name' => $rawPhotoResult['user']['last_name'],
                'unsplash_user_link_html' => $rawPhotoResult['links']['html'],
            ];
        }

        return response()->json($formattedResults);
    }
}
