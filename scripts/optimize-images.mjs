import sharp from 'sharp'
import { resolve } from 'node:path'

const names = ['hot-dog', 'burger', 'acai', 'ice-cream', 'drink']

await Promise.all(names.map(async (name) => {
  const input = resolve('public', 'images', `${name}.png`)
  const output = resolve('public', 'images', `${name}.webp`)
  await sharp(input)
    .resize(960, 720, { fit: 'cover', position: 'centre' })
    .webp({ quality: 80, effort: 5 })
    .toFile(output)
}))

console.log('Imagens otimizadas:', names.join(', '))
