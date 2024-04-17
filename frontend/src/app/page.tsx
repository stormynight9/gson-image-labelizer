'use client'

import ImageUpload from '@/components/custom/image-upload'
import { Button } from '@/components/ui/button'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Loader2, PlusIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export type Image = {
    url: string
    label: string | null
}

export default function Home() {
    const [images, setImages] = useState<Image[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [parent, enableAnimations] = useAutoAnimate()

    const addToImages = (image: Image) => {
        setImages((prev) => [image, ...prev])
    }

    const updateImage = (url: string, label: string) => {
        setImages((prev) =>
            prev.map((image) => {
                if (image.url === url) {
                    return { ...image, label }
                }
                return image
            })
        )
    }

    useEffect(() => {
        const storedImages = localStorage.getItem('images')
        if (storedImages) {
            setImages(JSON.parse(storedImages))
        }
    }, [])

    useEffect(() => {
        if (images.length === 0) return
        localStorage.setItem('images', JSON.stringify(images))
    }, [images])

    console.log(images)
    return (
        <main className='flex justify-center items-center min-h-screen flex-col space-y-4'>
            <h1 className='text-3xl md:text-5xl font-semibold mt-5'>
                gson-image-labelizer
            </h1>
            <p className='text-muted-foreground'>
                <span className='text-primary font-medium'>G</span>hazi -{' '}
                <span className='text-primary font-medium'>S</span>irine -{' '}
                <span className='text-primary font-medium'>O</span>ussama -{' '}
                <span className='text-primary font-medium'>N</span>ader
            </p>
            <div className='flex gap-4'>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className='rounded-full shadow flex items-center gap-2'>
                            <PlusIcon className='size-6' />
                            Add image
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                        <DialogHeader>
                            <DialogTitle className='text-center'>
                                Upload your image
                            </DialogTitle>
                            <DialogDescription className='text-center'>
                                Turn your images into text 🚀
                            </DialogDescription>
                        </DialogHeader>
                        <div className='grid gap-4 py-4'>
                            <ImageUpload
                                addToImages={addToImages}
                                setIsOpen={setIsOpen}
                                updateImage={updateImage}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div
                ref={parent}
                className='mt-6 grid gap-4 grid-cols-[repeat(auto-fit,320px)] place-content-center flex-wrap max-w-screen-xl w-full mx-auto'
            >
                {images.map((image) => (
                    <div key={image.url} className='max-w-80 group'>
                        <div className='flex gap-4 relative  '>
                            <Image
                                src={image.url}
                                alt='image'
                                width={320}
                                height={320}
                                className='size-80 object-cover rounded-lg'
                            />
                            {image.label === null && (
                                <div className='bg-black/40 absolute top-0 text-white flex-row gap-2 text-lg bottom-0 right-0 left-0 rounded-lg flex justify-center items-center'>
                                    <Loader2 className='size-6  animate-spin' />
                                </div>
                            )}
                            <div className='absolute top-0 right-0 p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                                <Button
                                    size={'icon'}
                                    variant={'ghost'}
                                    className='rounded-full bg-black/20 hover:bg-black/60'
                                    onClick={() => {
                                        if (images.length === 1) {
                                            enableAnimations(false)
                                            localStorage.setItem(
                                                'images',
                                                JSON.stringify([])
                                            )
                                        } else {
                                            enableAnimations(true)
                                        }
                                        setImages((prev) =>
                                            prev.filter(
                                                (img) => img.url !== image.url
                                            )
                                        )
                                    }}
                                >
                                    <XIcon className='size-6 text-white  ' />
                                </Button>
                            </div>
                        </div>
                        {image.label !== null && (
                            <p className='mt-1 text-center'>{image.label}</p>
                        )}
                    </div>
                ))}
            </div>
        </main>
    )
}
