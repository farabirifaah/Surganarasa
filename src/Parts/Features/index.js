import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi, faLock, faCar, faMusic, faCoffee, faLeaf, faCake, faToilet, faCalendarAlt, faUtensils, faHome, faLaptop } from '@fortawesome/free-solid-svg-icons'
import { Zoom } from 'react-awesome-reveal'
import TitleComponent from '../../Components/title'

const features = [
  // {
  //   name: 'Wifi Gratis',
  //   description:
  //     'Tetap terhubung sambil menikmati hidangan dengan WiFi berkecepatan tinggi yang tersedia di seluruh area restoran.',
  //   icon: faWifi,
  // },
  {
    name: 'Toilet Bersih',
    description:
      'Toilet kami selalu terjaga kebersihannya, memastikan kenyamanan dan kebersihan untuk semua tamu.',
    icon: faToilet,
  },
  {
    name: 'Valet Parkir Gratis',
    description:
      'Layanan valet parking yang nyaman tersedia agar Anda dapat fokus menikmati pengalaman bersantap Anda.',
    icon: faCar,
  },
  {
    name: 'Musik Live',
    description:
      'Nikmati penampilan musik live dari artis lokal setiap akhir pekan, menambah suasana makan yang menyenangkan.',
    icon: faMusic,
  },
  {
    name: 'Suasana nyaman',
    description:
      'Bersantai di area tempat duduk luar ruangan kami, ideal untuk menikmati udara segar dan pengalaman bersantap yang santai.',
    icon: faLeaf,
  },
  {
    name: 'Menu Tradisional dan Variatif',
    description:
      'Nikmati berbagai pilihan hidangan tradisional khas Indonesia yang variatif, dibuat dengan bahan-bahan segar.',
    icon: faUtensils,
  },
  {
    name: 'Venue Tradisional yang Nyaman',
    description:
      'Tempat kami didesain untuk memberikan suasana yang hangat dan nyaman, cocok untuk berkumpul bersama teman atau keluarga.',
    icon: faHome,
  },
  {
    name: 'Reservasi Online',
    description:
      'Pesan tempat dengan mudah melalui sistem reservasi online kami untuk pengalaman bersantap tanpa khawatir.',
    icon: faLaptop,
  },
]

export default function FeatureSection() {
  return (
    <div className="bg-[url('/src/Assets/bg4.svg')] bg-repeat bg-center bg-[length:1800px_1068.44px]  py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
        <Zoom>
                     <TitleComponent
                       classes="text-mainyellow-900"
                       title="Layanan Surganarasa"
                       description="Lihat beberapa keunggulan dari kami"
                       descClass="text-white"
                     />
                    </Zoom>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature, index) => (
              <Zoom key={feature.name} delay={150 * index}>
                <div className="relative pl-16">
                <dt className="text-sm font-light leading-10 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center align-middle rounded-lg bg-mainyellow-900">
                    <FontAwesomeIcon icon={feature.icon} aria-hidden="true" className="h-6 w-6 text-maingreen-900" />
                  </div>
                  {feature.name}
                </dt>
              </div>
              </Zoom>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
