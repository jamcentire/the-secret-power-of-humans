export default function Home() {
  return (
    <>
      <h1 className='text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl text-center mt-8'>
        Welcome to The Secret Power of Humans!
      </h1>
      <p className='mt-6 text-base text-gray-600 sm:text-lg text-center'>
        A game about ordinary people in extraordinary circumstances
      </p>
      <hr className="mx-auto my-10 w-24 border-gray-500" />
      <div>
        <blockquote className="mx-100 text-center italic">
          “Heroes didn't leap tall buildings or stop bullets with an outstretched hand; they didn't wear boots and capes. They bled, and they bruised, and their superpowers were as simple as listening, or loving. Heroes were ordinary people who knew that even if their own lives were impossibly knotted, they could untangle someone else's. And maybe that one act could lead someone to rescue you right back.”
        </blockquote>
        <p className='text-center mt-4'>- Jodi Picoult</p>
      </div>
    </>
  );
}
