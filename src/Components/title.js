import radioColors from "@material-tailwind/react/theme/components/radio/radioColors";

export default function TitleComponent({title, description, classes, descClass}){
 return (
  <div className="mx-auto" style={{maxWidth: 500}}>
   <h2
     id="collections-heading"
     className={`rounded-md text-4xl font-regular text-center leading-1 font-surgana p-5 bg-maingreen-900/75 sm:bg-maingreen-900/75 md:bg-maingreen-900/75 lg:bg-transparent `+ classes} 
   >
     {title}
   </h2>

   <h4
   className={`rounded-md p-4 text-base font-thin text-center leading-loose bg-maingreen-900/75 sm:bg-maingreen-900/75 md:bg-maingreen-900/75 lg:bg-transparent ${descClass}`}
   >
    {description}
   </h4>
  </div>
 );
}