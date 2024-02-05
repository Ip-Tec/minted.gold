import React from 'react'
import NewsLetter from './NewsLetter';
import { Link } from '@inertiajs/react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bg-white rounded-md p-2 w-full md:w-3/4 mx-auto mt-3">
        <h1 className="text-2xl text-center my-2 text-black">
          Subscribe To Our News Letter
        </h1>
        <NewsLetter />
      </div>
      <div className="text-white bg-yellow-950 p-3 h-rem] flex justify-center items-center">
        {/* <Center> */}
          <div className="md:flex justify-evenly items-center text-white">
            <ul className="mx-3">
              <h2 className="text-xl">Contact Us</h2>
              <li className="px-3 py-2">
                Phone: <span>+234 (0) 909 1234 234</span>
              </li>
              <li className="px-3 py-2">
                Email: <span>mail@mintedgold.com.ng</span>
              </li>
            </ul>

            <ul className="mx-3">
              <h2 className="text-xl">Useful Links</h2>
              <li className="px-3 py-2 hover:border-b hover:border-b-yellow-600 hover:bg-opacity-50">
                <Link href={"/"}>Home</Link>
              </li>
              <li className="px-3 py-2 hover:border-b hover:border-b-yellow-600">
                <Link href={"/#newproduct"}>Product</Link>
              </li>
              <li className="px-3 py-2 hover:border-b hover:border-b-yellow-600">
                <Link href={"/auth/deleteAccount"}>Account Deletion</Link>
              </li>
            </ul>

            <ul className="mx-3">
              <h2 className="text-xl">Our Services</h2>
              <li className="px-3 py-2">Sale of Gold</li>
              <li className="px-3 py-2">Gold Bar</li>
              <li className="px-3 py-2"></li>
            </ul>
          </div>
        {/* </Center> */}
      </div>
      <div className="text-white bg-yellow-800 p-3 flex justify-center items-center">
        <p className="p-3 text-center">
          Copyright &copy; {currentYear}. All Rights Reserved
        </p>
      </div>
    </>
  );
}

export default Footer