// src/components/InvestorPage.js

import React from 'react';
import Navigation from '../../Parts/Navigation';
import FooterSection from '../../Parts/Footer';
import TitleComponent from '../../Components/title';

const InvestorPage = () => {
  return (
    <>
      <Navigation />
      <div className="bg-maingreen-900 pt-44 pb-44 ">
        <div className="max-w-4xl mx-auto">
        <TitleComponent
            classes="text-mainyellow-900"
            title="Peluang Investasi!"
            description="Selamat datang di Surganarasa. Kami sangat senang mempersembahkan peluang bagi investor untuk bergabung dengan kami"
            descClass="text-white mb-24"
          />
          <h2 className="text-2xl font-semibold mt-6 text-white pb-3">1. Mengapa Berinvestasi di Kami?</h2>
          <p className="text-white pb-3">
            Kami menawarkan kesempatan unik bagi investor untuk menjadi bagian dari perusahaan inovatif dengan rekam jejak yang terbukti. Berikut adalah beberapa alasan untuk mempertimbangkan berinvestasi dengan kami:
          </p>
          <ul className="list-disc list-inside ml-4 text-white pb-3">
            <li>Kehadiran pasar yang kuat dan pengenalan merek.</li>
            <li>Komitmen terhadap praktik berkelanjutan dan inovasi.</li>
            <li>Tim manajemen berpengalaman dengan keahlian industri.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 text-white pb-3">2. Syarat Investasi</h2>
          <p className="text-white pb-3">
            Kami saat ini menawarkan syarat investasi sebagai berikut:
          </p>
          <p className="text-white pb-3">
            <strong>Jenis Investasi:</strong> Peluang investasi ekuitas tersedia dengan tingkat pengembalian yang kompetitif.
          </p>
          <p className="text-white pb-3">
            <strong>Investasi Minimum:</strong> Jumlah investasi minimum adalah [masukkan jumlah].
          </p>
          <p className="text-white pb-3">
            <strong>Pengembalian yang Diharapkan:</strong> Investor dapat mengharapkan pengembalian sebesar persentase kesepakatan per tahun, yang didistribusikan [masukkan frekuensi distribusi, misalnya, setiap triwulan].
          </p>

          <h2 className="text-2xl font-semibold mt-6 text-white pb-3">3. Potensi Pertumbuhan</h2>
          <p className="text-white pb-3">
            Perusahaan kami diposisikan untuk pertumbuhan yang substansial dalam beberapa tahun ke depan. Dengan rencana ekspansi ke [masukkan pasar atau sektor], kami memperkirakan peningkatan pendapatan dan pangsa pasar yang signifikan.
          </p>

          <h2 className="text-2xl font-semibold mt-6 text-white pb-3">4. Cara Berinvestasi</h2>
          <p className="text-white pb-3">
            Investor yang tertarik dapat menghubungi kami untuk informasi lebih rinci dan untuk membahas peluang investasi.
          </p>
          <p className="text-white pb-3">Untuk melanjutkan, silakan hubungi kami di:</p>
          <p className="text-white pb-2">
            <strong>Email:</strong> <a href="mailto:info@surganarasa.com" className="text-blue-600 underline">info@surganarasa.com</a>
          </p>

          <h2 className="text-2xl font-semibold mt-6 text-white pb-3">5. Hubungi Kami</h2>
          <p className="text-white pb-3">
            Jika Anda memiliki pertanyaan atau memerlukan informasi lebih lanjut, jangan ragu untuk menghubungi kami:
          </p>
          <p className="text-white pb-2">
            <strong>Alamat:</strong> Jl. Raya Rawa Buntu No.18, BSD, Serpong, Tangerang Selatan.
          </p>
        </div>
      </div>
      <FooterSection />
    </>
  );
};

export default InvestorPage;
