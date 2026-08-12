// Vercel Serverless Function - Free, No Blaze Needed!
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const targetUrl = req.query.url || (req.body && req.body.url);
  if (!targetUrl) return res.status(400).json({ error: 'url param missing' });

  try {
    let finalUrl = targetUrl;
    // fkrt.co short link follow
    if (targetUrl.includes('fkrt.co')) {
      const r = await fetch(targetUrl, { redirect: 'manual', headers: { 'User-Agent': 'Mozilla/5.0' } });
      finalUrl = r.headers.get('location') || targetUrl;
    }

    const resp = await fetch(finalUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    const html = await resp.text();
    const $ = cheerio.load(html);

    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || 'Product';
    const image = $('meta[property="og:image"]').attr('content') || $('img').first().attr('src') || '';
    const priceText = $('.a-price .a-offscreen, ._30jeq3, .notranslate').first().text() || $('meta[property="product:price:amount"]').attr('content') || '';
    const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
    const desc = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';

    res.json({
      success: true,
      title: title.trim().slice(0, 200),
      image: image,
      price: price,
      originalPrice: Math.round(price * 1.3) || 0,
      description: desc.slice(0, 500),
      finalUrl: finalUrl
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
    }
