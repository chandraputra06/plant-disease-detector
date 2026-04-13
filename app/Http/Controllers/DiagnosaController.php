<?php

namespace App\Http\Controllers;

use App\Models\Diagnosa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

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

        $result = $response->json();

        $imagePath = $image->store('diagnosas', 'public');

        $diagnosa = Diagnosa::create([
            'image_path' => $imagePath,
            'disease' => $result['disease'] ?? '-',
            'confidence' => $result['confidence'] ?? 0,
            'is_healthy' => $result['is_healthy'] ?? false,
            'treatment' => $result['treatment'] ?? null,
            'raw_result' => $result,
        ]);

        return response()->json([
            'message' => 'Diagnosa berhasil',
            'data' => $diagnosa,
            'result' => $result,
            'image_url' => asset('storage/' . $imagePath),
        ]);
    }
}