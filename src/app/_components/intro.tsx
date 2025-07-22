export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Discover Ethan
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        <a
          href="/myjourney/"
          className="inline-block bg-green-100 text-green-800 font-medium px-4 py-2 rounded-lg hover:bg-green-200 hover:text-green-900 transition duration-200"
        >
          📍 Explore My Journey →
        </a>
      </h4>
    </section>
  );
}

// 灰色，极简百搭，永不过时
// className="inline-block bg-gray-100 text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-gray-200 hover:text-gray-900 transition duration-200"
// 蓝色，稳妥之选，默认不错
// className="inline-block bg-blue-100 text-blue-800 font-medium px-4 py-2 rounded-lg hover:bg-blue-200 hover:text-blue-900 transition duration-200"
// 绿色，清新成长，儿童感强
// className="inline-block bg-green-100 text-green-800 font-medium px-4 py-2 rounded-lg hover:bg-green-200 hover:text-green-900 transition duration-200"
// 紫色，现代优雅，略有辨识度
// className="inline-block bg-purple-100 text-purple-800 font-medium px-4 py-2 rounded-lg hover:bg-purple-200 hover:text-purple-900 transition duration-200"
// 黄色，温暖有趣，略偏卡通风
// className="inline-block bg-yellow-100 text-yellow-800 font-medium px-4 py-2 rounded-lg hover:bg-yellow-200 hover:text-yellow-900 transition duration-200"