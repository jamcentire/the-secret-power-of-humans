import Link from 'next/link';

interface NavBarTabProps {
  displayText: string;
  pageRef: string;
}

const NavBarTab = (props: NavBarTabProps) => {
  return (
    <Link href={props.pageRef}
      className='w-1/10 h-1/2 text-xl rounded-3xl flex items-center justify-center hover:border-2 border-yellow-300 hover:shadow-[0_0_10px_8px_rgba(253,224,71,0.8)]'
    >
      {props.displayText}
    </Link>
  )
}

export const NavBar = () => {
  return (
    <div
      className='flex flex-row w-full h-22 justify-center bg-blue-300 shadow-md items-center gap-8'
    >
    <NavBarTab displayText='Home' pageRef='/' />
    <NavBarTab displayText='Character Creator' pageRef='/character-creator' />
    </div>
  )
}
