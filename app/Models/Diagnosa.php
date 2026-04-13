<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diagnosa extends Model
{
    /** @use HasFactory<\Database\Factories\DiagnosaFactory> */
    use HasFactory;

    protected $fillable = [
        'image_path',
        'disease',
        'confidence',
        'is_healthy',
        'treatment',
        'raw_result',
    ];

    protected $casts = [
        'is_healthy' => 'boolean',
        'raw_result' => 'array',
    ];
}
