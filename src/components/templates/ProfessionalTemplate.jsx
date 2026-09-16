import MinimalTemplate from './MinimalTemplate.jsx'

// Professional variant: tighter, resume-like presentation.
export default function ProfessionalTemplate(props) {
  return (
    <div className="[&_section]:mt-6">
      <MinimalTemplate {...props} />
    </div>
  )
}
