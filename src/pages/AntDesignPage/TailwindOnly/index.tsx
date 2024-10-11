/* eslint-disable react/no-unescaped-entities */
import MessageImg from 'src/assets/images/ant-design/message.svg';
import CaroBox from './CaroBox';

function SimpleMessage() {
  return (
    <div className="flex max-w-sm items-center space-x-4 rounded-xl bg-grey-50 p-6 shadow-lg">
      <div className="shrink-0">
        <img className="size-12" src={MessageImg} alt="ChitChat Logo" />
      </div>
      <div>
        <div className="text-black text-xl font-medium">ChitChat</div>
        <p className="text-slate-500">You have a new message!</p>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="max-w-sm space-y-2 rounded-xl bg-grey-50 px-8 py-8 shadow-lg sm:flex sm:items-center sm:space-x-6 sm:space-y-0 sm:py-4">
      <img
        className="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0"
        src={MessageImg}
        alt="Woman's Face"
      />
      <div className="space-y-2 text-center sm:text-left">
        <div className="space-y-0.5">
          <p className="text-black text-lg font-semibold">Erin Lindford</p>
          <p className="font-medium text-slate-500">Product Engineer</p>
        </div>
        <button className="rounded-full border border-purple-200 px-4 py-1 text-sm font-semibold text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
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
      <div className="mt-2 flex flex-wrap gap-5">
        <SimpleMessage />
        <Avatar />
        <div className="cycle h-[100px] w-[100px] bg-grey-50" />
        <div className="flex w-[50%] items-center">
          <div className="part-cycle h-[200px] w-[200px] bg-grey-50" />
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
          <div className="relative h-[250px] w-[50px]">
            <div className="absolute bottom-0 left-[-100%] right-[0%] top-0 flex flex-col">
              <div className="curve-shape1 aspect-square rounded-tr-[50%]" />
              <div className="curve-shape1 h-full" />
            </div>
          </div>
          <div className="relative h-[250px] w-[50px]">
            <div className="absolute bottom-0 left-[0%] right-[-100%] top-0 flex flex-col">
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
