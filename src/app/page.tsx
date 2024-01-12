"use client"

import Link from "next/link"
import React, { useState } from "react"

import Header from "./components/Header"

export default function Home() {
  return (
    <>
      <main className='flex flex-col w-100 border-solid border-2 border-black bg-slate-200 p-2 m-2'>
        Main
      </main>
      <footer className='flex flex-col w-100 border-solid border-2 border-black bg-slate-200 p-2 m-2'>
        footer
      </footer>
    </>
  )
}
