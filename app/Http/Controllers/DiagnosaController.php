<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DiagnosaController extends Controller
{
    public function diagnose(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:5120',
        ]);

        $image = $request->file('image');
        $aiServiceUrl = env('AI_SERVICE_URL', 'http://127.0.0.1:8001');

        $response = Http::timeout(30)
            ->attach(
                'file',
                file_get_contents($image->getRealPath()),
                $image->getClientOriginalName()
            )
            ->post($aiServiceUrl . '/predict');

        if ($response->failed()) {
            return response()->json([
                'message' => 'Gagal menghubungi AI service',
                'error' => $response->body(),
            ], 502);
        }

        return response()->json([
            'message' => 'Diagnosa berhasil',
            'result' => $response->json(),
        ]);
    }
}