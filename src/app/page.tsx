'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import Avatar from '@/components/atoms/common/Avatar'
import Chip from '@/components/atoms/common/Chip'

const getData = async () => {
  const data = await fetch('https://catfact.ninja/fact')
  return await data.json()
}
const getData2 = async () => {
  const data = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
  return await data.json()
}

export default function Home() {
  const [data, setData] = useState<any>()
  const [data2, setData2] = useState<any>()

  useEffect(() => {
    getData().then(res => setData(res))
    getData2().then(res => setData2(res))
  }, [])

  console.log(data, data2)

  return (
    <div className="borde flex max-w-[90vw] flex-col text-black">
      Home
      <Image alt="imageStory" width={500} height={250} src="https://picsum.photos/3000/750" />
      <Avatar />
      <Chip>hvhgvhgvjhhj</Chip>
      mb gvghjhvjvgjgh
    </div>
  )
}
