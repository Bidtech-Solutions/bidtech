import React from "react";

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": "https://bidtech.co.id/#organization",
        name: "BidTech",
        legalName: "PT Solusi Bisnis Jalanin Aja Dulu",
        alternateName: [
          "BidTech Solutions",
          "PT BidTech",
          "Bidtech Indonesia",
          "BidTech Software House",
        ],
        url: "https://bidtech.co.id",
        logo: {
          "@type": "ImageObject",
          "@id": "https://bidtech.co.id/#logo",
          url: "https://bidtech.co.id/logo/Logo.webp",
          caption: "BidTech Logo",
        },
        image: "https://bidtech.co.id/images/og-image.png",
        description:
          "BidTech adalah software house profesional di Indonesia yang berfokus pada jasa pembuatan website modern, aplikasi mobile Android & iOS, software custom (ERP & CRM), serta katalog template website siap pakai untuk percepatan bisnis digital.",
        telephone: "+628217601455",
        email: "cs@bidtech.co.id",
        priceRange: "Rp",
        currenciesAccepted: "IDR",
        paymentAccepted: "Bank Transfer, QRIS, Credit Card",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Wisma Bumiputera, Jl. Jend Sudirman Kav 75 Setiabudi No.02 Lantai 18, RT.003/RW.3, Kuningan, Setia Budi",
          addressLocality: "Jakarta Selatan",
          addressRegion: "DKI Jakarta",
          postalCode: "12910",
          addressCountry: "ID",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -6.2085,
          longitude: 106.8223,
        },
        location: [
          {
            "@type": "Place",
            name: "BidTech Jakarta Office",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Wisma Bumiputera, Jl. Jend Sudirman Kav 75 Setiabudi No.02 Lantai 18, RT.003/RW.3, Kuningan, Setia Budi, Kecamatan Setiabudi",
              addressLocality: "Kota Jakarta Selatan",
              addressRegion: "Daerah Khusus Ibukota Jakarta",
              postalCode: "12910",
              addressCountry: "ID",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -6.2085,
              longitude: 106.8223,
            },
            hasMap:
              "https://www.google.com/maps/search/?api=1&query=-6.207275%2C106.822519",
          },
          {
            "@type": "Place",
            name: "BidTech Batam Office",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "King Business Centre, Blok A5 No.3, Kel. Belian, Kec. Batam Kota",
              addressLocality: "Batam",
              addressRegion: "Kepulauan Riau",
              postalCode: "29464",
              addressCountry: "ID",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 1.1058157731502605,
              longitude: 104.07543166924557,
            },
            hasMap:
              "https://www.google.com/maps/search/?api=1&query=1.1058157731502605%2C104.07543166924557",
          },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        sameAs: [
          "https://www.instagram.com/bidtechsolutions/",
          "https://www.facebook.com/profile.php?id=61592059225349",
          "https://www.tiktok.com/@bidtechsolutions",
          "https://wa.me/628217601455",
          "https://bidtech.co.id",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+628217601455",
            contactType: "customer service",
            areaServed: "ID",
            availableLanguage: ["Indonesian", "English"],
          },
        ],
        knowsAbout: [
          "Website Development",
          "Mobile App Development",
          "Enterprise Resource Planning (ERP)",
          "Customer Relationship Management (CRM)",
          "UI/UX Design",
          "Cloud Architecture",
          "Next.js",
          "React",
          "Flutter",
          "TypeScript",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Layanan Solusi Teknologi & Pengembangan Digital BidTech",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Website Development (Company Profile, E-Commerce, Landing Page)",
                description:
                  "Pengembangan website modern dengan performa tinggi, desain responsif mobile-first, dan optimasi SEO terintegrasi.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mobile App Development (Android & iOS)",
                description:
                  "Pembuatan aplikasi mobile native dan hybrid berkecepatan tinggi dengan antarmuka pengguna yang intuitif.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Business System (ERP, CRM & POS)",
                description:
                  "Pembangunan sistem perangkat lunak kustom untuk automasi operasional, inventori stok, pencatatan transaksi kasir, dan analitik bisnis.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Template Website Siap Pakai",
                description:
                  "Koleksi template website premium yang siap dirilis cepat untuk industri otomotif, e-commerce, industri/konstruksi, dan portofolio profesional.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://bidtech.co.id/#website",
        url: "https://bidtech.co.id",
        name: "BidTech",
        alternateName: "BidTech Digital Solutions",
        description:
          "Software House & Solusi Digital Indonesia: Website, Mobile Apps & Custom Systems",
        publisher: {
          "@id": "https://bidtech.co.id/#organization",
        },
        inLanguage: ["id-ID", "en-US"],
      },
      {
        "@type": "FAQPage",
        "@id": "https://bidtech.co.id/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Apa itu BidTech dan solusi apa yang disediakan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "BidTech adalah software house profesional di Indonesia yang berfokus pada penyediaan solusi digital terintegrasi. Layanan kami meliputi pembuatan website modern (company profile, e-commerce, landing page), pengembangan aplikasi mobile (Android & iOS), sistem kustom bisnis (ERP, CRM, POS, dashboard analytics), serta penyediaan template website siap pakai untuk berbagai industri.",
            },
          },
          {
            "@type": "Question",
            name: "Berapa lama estimasi waktu pembuatan website atau aplikasi di BidTech?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Estimasi waktu tergantung pada skala dan kompleksitas proyek. Untuk template website siap pakai, proses deployment dan kustomisasi dapat selesai dalam 1–3 hari kerja. Pembuatan website kustom berkisar antara 2–4 minggu. Sedangkan untuk aplikasi mobile dan sistem enterprise kustom (seperti ERP/CRM), estimasi pengerjaan berkisar antara 4–12 minggu dengan tahapan terstruktur mulai dari requirement, desain UI/UX, development, hingga testing.",
            },
          },
          {
            "@type": "Question",
            name: "Apakah website dan sistem yang dibuat oleh BidTech sudah Mobile-Friendly dan SEO-Ready?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ya, semua website dan aplikasi yang kami kembangkan dirancang dengan standar Mobile-First, performa kecepatan loading tinggi, struktur keamanan teruji, dan optimasi SEO on-page lengkap agar mudah terindeks di Google dan mesin pencari generasi AI (AEO & GEO).",
            },
          },
          {
            "@type": "Question",
            name: "Apakah BidTech melayani pembuatan sistem software custom sesuai kebutuhan bisnis?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Tentu. Kami memiliki spesialisasi dalam merancang dan mengembangkan sistem software kustom dari nol, termasuk automasi alur kerja, sistem kasir (POS), inventori stok barang, manajemen klinik kesehatan, sistem sekolah, hingga integrasi payment gateway dan WhatsApp automation.",
            },
          },
          {
            "@type": "Question",
            name: "Bagaimana alur kerja sama dan konsultasi dengan tim BidTech?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Anda dapat langsung menghubungi tim kami via WhatsApp di 0821-7601-455 atau melalui email cs@bidtech.co.id. Kami menyediakan sesi konsultasi gratis secara online maupun offline (kunjungan langsung di Jakarta dan Batam) untuk menganalisis kebutuhan bisnis dan memberikan estimasi transparan.",
            },
          },
          {
            "@type": "Question",
            name: "Apakah ada garansi dan dukungan teknis setelah website atau aplikasi selesai?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pasti. Kami memberikan garansi pemeliharaan teknis, monitoring bug, update keamanan rutin, serta dukungan teknis 24/7 paska-peluncuran agar sistem operasional bisnis Anda selalu berjalan stabil dan lancar.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
