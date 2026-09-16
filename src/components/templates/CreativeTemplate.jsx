import MinimalTemplate from './MinimalTemplate.jsx'

// Creative variant: wider spacing and larger display type.
export default function CreativeTemplate(props) {
  return (
    <div className="tracking-wide [&_h1]:text-5xl">
      <MinimalTemplate {...props} />
    </div>
  )
}
