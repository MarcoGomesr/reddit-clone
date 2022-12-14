import Image from 'next/image'
import React from 'react'
import {
  HomeIcon,
  ChevronDownIcon,
  SearchIcon,
  SparklesIcon,
  GlobeIcon,
  VideoCameraIcon,
  MenuIcon,
} from '@heroicons/react/solid'
import { ChatIcon, BellIcon, PlusIcon } from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

function Header() {
  const { data: session } = useSession()
  return (
    <div className="sticky top-0 flex bg-white px-4 py-2 shadow-sm">
      <div className="relative h1-10 w-20 flex-shrink-0 cursor-pointer">
        <Link href={'/'}>
          <Image
            objectFit="contain"
            src={'http://links.papareact.com/fqy'}
            layout="fill"
            priority
          />
        </Link>
      </div>

      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 hidden ml-2 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* search box */}
      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>

      <div className="mx-5 flex items-center space-x-2 text-gray-500 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>

      {/* Sign in / Sign up */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden items-center lg:flex cursor-pointer items-center space-x-2 border border-gray-100 p-2"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              alt=""
              objectFit="contain"
            />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">Sign Out</p>
          </div>

          <ChevronDownIcon className="h-5 w-5" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden items-center lg:flex cursor-pointer items-center space-x-2 border border-gray-100 p-2"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              alt=""
              objectFit="contain"
            />
          </div>
          <p className="text-gray-400">Sign in</p>
        </div>
      )}
    </div>
  )
}

export default Header
