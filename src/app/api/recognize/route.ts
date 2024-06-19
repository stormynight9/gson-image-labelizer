import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    const data = await req.json()
    const response = await fetch(
        'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large',
        {
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            },
            method: 'POST',
            body: JSON.stringify({
                inputs: data.inputs,
            }),
        }
    )
    const label = await response.json()

    return Response.json({ label: label[0].generated_text })
}
