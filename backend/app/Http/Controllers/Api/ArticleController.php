<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
    /**
     * Display a listing of published articles.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Article::where('status', 'published');

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $limit = $request->input('limit', 10);
        $articles = $query->orderBy('created_at', 'desc')->take((int)$limit)->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar artikel edukasi bioflok berhasil diambil.',
            'count' => $articles->count(),
            'data' => $articles
        ]);
    }

    /**
     * Display the specified article.
     */
    public function show(string $idOrSlug): JsonResponse
    {
        $article = Article::where('status', 'published')
            ->where(function ($q) use ($idOrSlug) {
                $q->where('id', $idOrSlug)
                  ->orWhere('slug', $idOrSlug);
            })
            ->first();

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Artikel tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail artikel berhasil diambil.',
            'data' => $article
        ]);
    }
}
