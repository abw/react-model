// These constants are replaced by Vite.  See the vite.defs.js file in the
// root directory where they are defined.  They are included as the define
// options in vite.config.js

/* eslint-disable no-undef */
export const version   = PACKAGE_VERSION
export const date      = BUILD_DATE
export const start     = '2023'
export const year      = date.match(/^(\d+)/)[1]
export const copyright = year === start ? year : `${start} - ${year}`

const site = {
  title:      'React Model',
  author:     'Andy Wardley',
  authorLink: 'https://github.com/abw',
  repository: 'https://github.com/abw/react-model',
  badgerpower: true,
  basename:    import.meta.env.BASE_URL,
  copyright,
  version,
  date,
}

export default site