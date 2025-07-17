import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://res.cloudinary.com/ds6kxgjh0/image/upload/v1752784647/IMG_6347_s1quqs.png"
                alt="Elena Rose - Nail Artist"
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-60" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-40" />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-light text-gray-800 mb-4">
                Гэрэлмаа
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full" />
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                1+ жилийн турш гоо сайхны салбар, тэр дундаа маникюр дизайны
                чиглэлээр ажиллаж, энэхүү урлагийг төгөлдөржүүлэхэд өөрийгөө
                бүрэн зориулж ирсэн. Миний зорилго бол үйлчлүүлэгч бүрийн
                онцлогт тохирсон, дахин давтагдашгүй хэв маягийг бүтээхэд
                оршдог.
              </p>
              <p>
                Франц маникюр, гель будаг, нарийн хийцтэй nail art хийцээр
                мэргэшсэн бөгөөд миний хийдэг бүх загвар нь өндөр чанартай
                бүтээгдэхүүн ашиглан, маш нягт нарийвчлалтайгаар бүтээгддэг тул
                удаан хугацаанд гоёмсог хэвээр хадгалагддаг.
              </p>
              <p>
                Манай салон нь танд тайвширч, өөрийгөө эрхлүүлэх боломжтой
                тансаг, амар амгалан орчныг бүрдүүлсэн. Миний итгэл үнэмшил бол
                хумсны гоо сайхан гэдэг нь зүгээр нэг чимэглэл биш, харин
                өөрийгөө илэрхийлэх урлаг юм.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 bg-rose-50 rounded-lg">
                <div className="text-2xl font-bold text-rose-600">300+</div>
                <div className="text-sm text-gray-600">
                  Сэтгэл хангалуун үйлчлүүлэгч
                </div>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">1+</div>
                <div className="text-sm text-gray-600">Жилийн туршлага</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
