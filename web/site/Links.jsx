import { Link } from '@abw/badger-website'

// eslint-disable-next-line react/display-name
const ExtLinker = (href, text=href) => (props={}) =>
  <Link
    {...props}
    href={`${href}${props.path||''}`}
    code={props.code}
    text={props.code||props.text||text}
    targetBlank
  />

export const BadgerCSSLink = ExtLinker('https://badgerpower.com/badger-css/', 'Badger CSS')
export const ReactContextLink = ExtLinker('https://badgerpower.com/react-context/', 'React Context')