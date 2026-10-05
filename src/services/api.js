import axios from 'axios';
import { DEFAULT_PRODUCTS, DEFAULT_ARTICLES } from '../data/budidayaData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

/**
 * Fetch all products from Laravel REST API with fallback to local state
 */
export async function getProducts() {
  try {
    const res = await apiClient.get('/products');
    if (res.data && res.data.success && Array.isArray(res.data.data)) {
      // Map API fields if needed (e.g. name -> nama, price -> harga)
      const mapped = res.data.data.map(p => ({
        id: p.id,
        nama: p.name || p.nama,
        harga: Number(p.price || p.harga || 0),
        satuan: p.unit || p.satuan || '/kg',
        img: p.image_url ? (p.image_url.startsWith('/') ? p.image_url : `/${p.image_url}`) : (p.img || '/assets/ikan-nila-bioflok.png'),
        desk: p.description || p.desk || '',
        feats: p.feats || ['100% Organik Bioflok', 'Kualitas Panen Premium', 'Bebas Bau Lumpur'],
        sizes: p.sizes || ['Kemasan Standar', 'Partai Besar'],
        stok: p.stock > 0 ? 'ada' : 'habis',
        pop: Boolean(p.is_popular || p.pop),
        kategori: p.category || p.kategori || 'Ikan Konsumsi',
        tags: p.tags || (p.is_popular ? ['Best Seller', 'Pilihan Utama'] : ['Nila Bioflok'])
      }));
      return { data: mapped, source: 'api' };
    }
  } catch (err) {
    console.warn('[API] Laravel backend offline or unreachable. Using authentic local catalog.', err.message);
  }
  return { data: DEFAULT_PRODUCTS, source: 'local' };
}

/**
 * Fetch single product by id or slug
 */
export async function getProductById(idOrSlug) {
  try {
    const res = await apiClient.get(`/products/${idOrSlug}`);
    if (res.data && res.data.success && res.data.data) {
      const p = res.data.data;
      return {
        id: p.id,
        nama: p.name || p.nama,
        harga: Number(p.price || p.harga || 0),
        satuan: p.unit || p.satuan || '/kg',
        img: p.image_url ? (p.image_url.startsWith('/') ? p.image_url : `/${p.image_url}`) : (p.img || '/assets/ikan-nila-bioflok.png'),
        desk: p.description || p.desk || '',
        feats: p.feats || ['100% Organik Bioflok', 'Kualitas Panen Premium'],
        stok: p.stock > 0 ? 'ada' : 'habis',
        kategori: p.category || p.kategori
      };
    }
  } catch {}
  return DEFAULT_PRODUCTS.find(p => p.id === idOrSlug || p.id === Number(idOrSlug)) || DEFAULT_PRODUCTS[0];
}

/**
 * Fetch articles from Laravel REST API with fallback to local state
 */
export async function getArticles() {
  try {
    const res = await apiClient.get('/articles');
    if (res.data && res.data.success && Array.isArray(res.data.data)) {
      const mapped = res.data.data.map(a => ({
        id: a.id,
        judul: a.title || a.judul,
        ringkas: a.excerpt || a.ringkas,
        tgl: a.created_at ? new Date(a.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : (a.tgl || '03 Okt 2026'),
        author: a.author || 'Tim Ahli Bioflok NilaFarm',
        img: a.image_url ? (a.image_url.startsWith('/') ? a.image_url : `/${a.image_url}`) : (a.img || '/assets/products/kolam-d4.jpg'),
        isi: a.content ? a.content.split('\n\n').filter(Boolean) : (a.isi || [a.excerpt])
      }));
      return { data: mapped, source: 'api' };
    }
  } catch (err) {
    console.warn('[API] Laravel backend offline or unreachable. Using authentic local articles.', err.message);
  }
  return { data: DEFAULT_ARTICLES, source: 'local' };
}
