import { ALLOWED_MIME_TYPES, MAX_GIF_BYTES, MAX_IMAGE_BYTES } from '../../constants/image'

function formatBytes(bytes: number) {
  const mb = bytes / 1024 / 1024
  return `${mb.toFixed(1)}MB`
}

export function validateImage(file: File): string | null {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return '지원하지 않는 파일 형식입니다. (허용: jpg, png, gif, webp)'
  }

  const isGif = file.type === 'image/gif'
  const limit = isGif ? MAX_GIF_BYTES : MAX_IMAGE_BYTES
  if (file.size > limit) {
    return `${isGif ? 'GIF' : '이미지'}는 최대 ${formatBytes(limit)}까지 업로드할 수 있습니다. (현재: ${formatBytes(
      file.size,
    )})`
  }

  return null
}
