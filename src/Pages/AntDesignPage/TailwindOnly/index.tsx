/* eslint-disable react/no-unescaped-entities */
import MessageImg from 'src/assets/images/ant-design/message.svg';
import CaroBox from './CaroBox';

function SimpleMessage() {
  return (
    <div className="p-6 max-w-sm bg-grey-50 rounded-xl shadow-lg flex items-center space-x-4">
      <div className="shrink-0">
        <img className="size-12" src={MessageImg} alt="ChitChat Logo" />
      </div>
      <div>
        <div className="text-xl font-medium text-black">ChitChat</div>
        <p className="text-slate-500">You have a new message!</p>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="py-8 px-8 max-w-sm bg-grey-50 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
        src={MessageImg}
        alt="Woman's Face"
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">Erin Lindford</p>
          <p className="text-slate-500 font-medium">Product Engineer</p>
        </div>
        <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
          Message
        </button>
      </div>
    </div>
  );
}

export default function TailwindOnly() {
  return (
    <>
      <p className="font-xl">Tailwind Only</p>
      <div className="mt-2 flex gap-5 flex-wrap">
        <SimpleMessage />
        <Avatar />
        <div className="cycle w-[100px] h-[100px] bg-grey-50" />
        <div className="flex items-center w-[50%]">
          <div className="part-cycle w-[200px] h-[200px] bg-grey-50" />
          <span>
            In this one a circle is created using the shape-outside property. You also have to apply
            a clip-path with the corresponding property for the circle to show up. The clip-path
            property can take the same value as the shape-outside property so we can give it the
            standard circle() shape that we used for shape-outside. Also, note that I've applied a
            20px margin on the element here to give the text some space.
          </span>
        </div>
      </div>
      <div className="flex">
        <p>Point</p>
        <div className="curve-common inline-flex">
          <div className="relative w-[50px] h-[250px]">
            <div className="absolute top-0 bottom-0 left-[-100%] right-[0%] flex flex-col">
              <div className="curve-shape1 aspect-square rounded-tr-[50%]" />
              <div className="curve-shape1 h-full" />
            </div>
          </div>
          <div className="relative w-[50px] h-[250px]">
            <div className="absolute top-0 bottom-0 left-[0%] right-[-100%] flex flex-col">
              <div className="curve-shape2 h-full" />
              <div className="curve-shape2 aspect-square rounded-bl-[50%]" />
            </div>
          </div>
        </div>
        <p>Point</p>
      </div>
      <CaroBox className="mt-5" />
    </>
  );
}
