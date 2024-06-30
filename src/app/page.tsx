import Image from '@/components/atoms/common/Image'
import Tabs from '@/components/molecules/common/Tabs'
import ImageViewer from '@/components/molecules/popovers/ImageViewer'
import { PageProps } from '@/utils/types'

import { tabs } from '../../.storybook/helpers'

export default function Home({ searchParams }: PageProps) {
  return (
    <div className="flex max-w-[90vw] flex-col text-black">
      <Tabs name="test" tabs={tabs} param={searchParams.tab || ''} />
      <ImageViewer alt="imageStory">
        <Image
          src="https://picsum.photos/3000/750"
          alt="imageStory"
          ratio={75}
          objectFit="object-cover"
        />
      </ImageViewer>
    </div>
  )
}
