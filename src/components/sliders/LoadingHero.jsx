import Image from "next/image";

const LoadingHero = () => {
  return (
    <>
      <div className="relative h-[420px] maxmd:h-full grid grid-cols-2 maxmd:grid-cols-1 w-full px-10 maxmd:px-5 maxsm:pl-2 pt-20 maxsm:pt-10">
        <div className={`maxmd:h-[250px]`}>
          <div className="relative w-full h-full pr-10 maxmd:pr-0 overflow-x-hidden">
            {/* Text Column */}
            <div className="w-full h-full relative grid grid-cols-1 items-start ">
              <p className="uppercase text-xs text-gray-400 tracking-widest">
                {"Digital"}
              </p>
              <h2 className="font-primary text-7xl maxlg:text-5xl maxmd:text-4xl flex flex-wrap items-center gap-x-3">
                <span>{"We Bring"}</span>
                <span className="text-secondary">{"Customers"}</span>
              </h2>
              <p className="text-sm font-secondary mt-2">
                {
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet qui architecto sapiente soluta eveniet et quae sit sint"
                }
              </p>
            </div>
          </div>
        </div>
        <div className="relative flex maxmd:h-[200px]">
          {/* Right Images */}
          <div className="relative ">
            <Image
              src={"/images/branding_para_marca.webp"}
              alt="cover imagen"
              priority
              width={500}
              height={340}
              className="object-cover w-[500px] h-[340px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingHero;
