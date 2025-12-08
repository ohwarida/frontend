import React from 'react'
import Header from '@/components/layout/header/Header'
import Button from '@/components/ui/Button'
import Input from "@/components/ui/Input";
import Main from "@/components/layout/Main";
import Aside from "@/components/layout/aside/Aside";
import AvatarButton from "@/components/layout/header/AvatarButton";
import Link from "next/link";
import PageButton from "@/components/layout/PageButton";

export default async function AuthenticatedLayout({children}: { children: React.ReactNode }) {
  return (
    <>
      <Header layoutType="authenticated">
        <div className="flex items-center justify-between gap-4 w-full">
          <Input icon='😊'/>
          <div className='flex items-center gap-5'>
            <Link href=''><Button>sdf</Button></Link>
            <AvatarButton/>
          </div>
        </div>
      </Header>

      <Main>
        <Aside/>
        <section className="w-full">
          <PageButton/>
          <div className='pt-[100px]'>
            {children}
          </div>
        </section>
      </Main>
    </>
  )
}
