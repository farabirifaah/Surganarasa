import { Button, Typography } from "@material-tailwind/react";

export function PromoSection() {
  return (
    <section className="bg-[url('/src/Assets/bg4.svg')] bg-cover bg-center py-24 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 bg-white">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-bold mb-2"
          >
            Upcoming Events
          </Typography>
          <Typography variant="h3" color="blue-gray">
            Tech Summit: Shaping Tomorrow
          </Typography>
          <Typography
            className="mt-2 mb-6 !text-base font-normal text-gray-500"
          >
            Prepare to be part of dynamic conversations that will redefine the
            boundaries.
          </Typography>
          <Button variant="outlined" className="flex-shrink-0">
            join now
          </Button>
      </div>
    </section>
  );
}
export default PromoSection;