'use client'

import { useEdgeStore } from '@/lib/edgestore'
import { useMutation } from '@tanstack/react-query'
import { CloudIcon, ImageIcon } from 'lucide-react'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import { toast } from 'sonner'
import { Progress } from '../ui/progress'
import type { Image } from '@/app/page'
import { recognize } from '@/lib/utils'

export default function ImageUpload({
    addToImages,
    setIsOpen,
    updateImage,
}: {
    addToImages: (image: Image) => void
    setIsOpen: (value: boolean) => void
    updateImage: (url: string, label: string) => void
}) {
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const { edgestore } = useEdgeStore()

    const { mutate } = useMutation({
        mutationFn: async (file: File) => {
            const response = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                    setUploadProgress(progress)
                },
            })
            await new Promise((resolve) => setTimeout(resolve, 1500))
            addToImages({
                url: response.url,
                label: null,
            })
            setIsOpen(false)
            const label = await recognize(response.url)
            updateImage(response.url, label.result)
        },
        onSuccess: () => {},
        onError: () => {
            toast.error('Error uploading image')
        },
    })

    return (
        <div>
            <Dropzone
                multiple={false}
                accept={{
                    'image/*': ['.png', '.jpg', '.jpeg'],
                }}
                onDrop={(acceptedFile) => {
                    setIsUploading(true)
                    mutate(acceptedFile[0])
                }}
            >
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                    <div
                        {...getRootProps()}
                        className='rounded-lg border border-dashed border-gray-300'
                    >
                        <div className='flex h-full  w-full items-center justify-center'>
                            <div className='flex h-full min-h-[256px] w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 p-2 hover:bg-gray-100'>
                                <div className='flex flex-col items-center justify-center pb-6 pt-5'>
                                    <CloudIcon className='mb-2 h-6 w-6 text-zinc-500' />
                                    <p className='mb-2 text-center text-sm text-zinc-700'>
                                        <span className='font-semibold'>
                                            Click or drag
                                        </span>{' '}
                                        to upload your image
                                    </p>
                                    <p className='text-xs text-zinc-500'>
                                        (png, jpg, jpeg)
                                    </p>
                                </div>

                                {acceptedFiles && acceptedFiles[0] ? (
                                    <div className='flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200'>
                                        <div className='grid h-full place-items-center px-3 py-2'>
                                            <ImageIcon className='h-4 w-4 ' />
                                        </div>
                                        <div className='h-full truncate px-3 py-2 text-sm'>
                                            {acceptedFiles[0].name}
                                        </div>
                                    </div>
                                ) : null}

                                {isUploading ? (
                                    <div className='mx-auto mt-4 w-full max-w-xs'>
                                        <div className='flex items-center gap-2'>
                                            <Progress
                                                indicatorColor={
                                                    uploadProgress === 100
                                                        ? 'bg-green-500'
                                                        : ''
                                                }
                                                value={uploadProgress}
                                                className='h-1 w-full bg-zinc-200'
                                            />
                                            <span className='text-sm text-zinc-600'>
                                                {Math.floor(uploadProgress)}%
                                            </span>
                                        </div>
                                        {uploadProgress === 100 ? (
                                            <div className='flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700'>
                                                Image uploaded successfully
                                            </div>
                                        ) : null}
                                    </div>
                                ) : null}

                                <input
                                    {...getInputProps()}
                                    type='file'
                                    className='hidden'
                                />
                            </div>
                        </div>
                    </div>
                )}
            </Dropzone>
        </div>
    )
}
