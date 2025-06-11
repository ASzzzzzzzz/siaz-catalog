// SIAZ* Product Database
// Ini adalah "Buku Resep" pusat untuk semua produk Anda.
// Untuk menambah produk, cukup salin salah satu blok, tempel, dan ganti isinya.

const productDatabase = {
    'monogram-tee': {
        name: 'Monogram Tee',
        price: 'Rp 450.000',
        description: 'Kaos katun premium dengan cetakan monogram SIAZ* yang subtle di bagian dada. Potongan regular fit yang nyaman untuk dipakai sehari-hari, memberikan kesan minimalis namun tetap berkarakter.',
        images: [
            './images/RUNZ__2b.jpg',
            './images/RUNZ__1.jpg',
            'https://placehold.co/800x1000/dcdcdc/333333?text=Detail+Kerah',
            'https://placehold.co/800x1000/d6d6d6/333333?text=Detail+Bahan',
        ],
        buyLink: 'https://instagram.com/siaz',
        relatedItems: ['tech-cargo', 'nylon-cap']
    },
    'utility-hoodie': {
        name: 'Utility Hoodie',
        price: 'Rp 899.000',
        description: 'Hoodie fungsional dengan bahan fleece tebal yang hangat. Dilengkapi dengan beberapa kantong dan detail strap yang terinspirasi dari gaya techwear. Statement piece yang sempurna untuk cuaca dingin.',
        images: [
            'https://placehold.co/800x1000/e8e8e8/333333?text=SIAZ*+Hoodie+Depan',
            'https://placehold.co/800x1000/e0e0e0/333333?text=SIAZ*+Hoodie+Samping',
            'https://placehold.co/800x1000/dcdcdc/333333?text=Detail+Hoodie',
        ],
        buyLink: 'https://instagram.com/siaz',
        relatedItems: ['tech-cargo']
    },
    'tech-cargo': {
        name: 'Tech Cargo Pants',
        price: 'Rp 750.000',
        description: 'Celana kargo yang didesain ulang dengan sentuhan modern. Bahan ripstop yang ringan dan tahan lama, dengan potongan relaxed fit.',
        images: [
            'https://placehold.co/800x1000/e8e8e8/333333?text=SIAZ*+Cargo+Depan',
            'https://placehold.co/800x1000/e0e0e0/333333?text=SIAZ*+Cargo+Samping',
        ],
        buyLink: 'https://instagram.com/siaz',
        relatedItems: ['monogram-tee', 'utility-hoodie']
    },
    'nylon-cap': {
        name: 'Nylon Cap',
        price: 'Rp 350.000',
        description: 'Topi 6-panel klasik yang dibuat dari bahan nilon ringan dan tahan air. Sempurna untuk melengkapi gaya streetwear Anda.',
        images: [
            'https://placehold.co/800x1000/e8e8e8/333333?text=SIAZ*+Cap+Depan',
            'https://placehold.co/800x1000/e0e0e0/333333?text=SIAZ*+Cap+Samping',
        ],
        buyLink: 'https://instagram.com/siaz',
        relatedItems: ['monogram-tee']
    }
};
