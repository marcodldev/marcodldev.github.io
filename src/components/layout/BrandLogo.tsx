import { assetUrl } from '../../utils/assetUrl'

export default function BrandLogo() {
  return (
    <img
      src={assetUrl('mdl-logo.png')}
      alt="MDL web dev"
      className="brand-logo"
  width={160}
  height={64}
      decoding="async"
    />
  )
}
