import TitleComponent from "../../Components/title"

const features = [
 { name: 'Origin', description: 'Designed by Good Goods, Inc.'},
 { name: 'Material', description: 'Solid walnut base with rare earth magnets and powder coated steel card cover' },
 { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
 { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
 { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
 { name: 'Considerations', description: 'Made from natural materials. Grain and color vary with each item.' },
]

export default function VariationSection() {
 return (
   <div className="bg-maingreen-900">
     <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
     <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
         <img
           alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
           src="https://firebasestorage.googleapis.com/v0/b/surganarasa-36192.appspot.com/o/surgana%20rasa%20part%202-083.jpg?alt=media&token=4ba6d1cf-c0e4-418a-a0ee-1aefbb4f2fe8"
           className="rounded-lg bg-gray-100 w-96 min-h-60 object-center object-cover"
         />
         <img
           alt="Top down view of walnut card tray with embedded magnets and card groove."
           src="https://firebasestorage.googleapis.com/v0/b/surganarasa-36192.appspot.com/o/surgana%20rasa%20part%202-285.jpg?alt=media&token=57fb3ca0-d313-4f78-8c91-1a22b4025671"
           className="rounded-lg bg-gray-100 w-96 min-h-60 object-center object-cover"
         />
         <img
           alt="Side of walnut card tray with card groove and recessed card area."
           src="https://firebasestorage.googleapis.com/v0/b/surganarasa-36192.appspot.com/o/surgana%20rasa%20part%202-226.jpg?alt=media&token=0e641c39-22ac-4438-a430-22b7e37b6e87"
           className="rounded-lg bg-gray-100 w-96 min-h-60 object-center object-cover"
         />
         <img
           alt="Walnut card tray filled with cards and card angled in dedicated groove."
           src="https://firebasestorage.googleapis.com/v0/b/surganarasa-36192.appspot.com/o/surgana%20rasa%20part%202-185.jpg?alt=media&token=36537f18-2247-4843-870d-321cccce7f2a"
           className="rounded-lg bg-gray-100 w-96 min-h-60 object-center object-cover"
         />
       </div>
       <div>
        <TitleComponent 
          classes="text-mainyellow-900" 
          title="Paket Acara!" 
          description="Rasakan & Rayakan Momen Spesial dengan berbagai Paket Pilihan dari Kami"
          descClass="text-white"
        />

         <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
           {features.map((feature) => (
             <div key={feature.name} className="border-t border-gray-200 pt-4">
               <dt className="font-medium text-gray-900">{feature.name}</dt>
               <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
             </div>
           ))}
         </dl>
       </div>
     </div>
   </div>
 )
}
