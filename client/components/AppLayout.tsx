import { Outlet, useMatches } from 'react-router-dom'

import useDocumentTitle from '../hooks/useDocumentTitle'

function AppLayout() {
  const matches = useMatches()
  const pageTitle = matches[1].handle
  useDocumentTitle(pageTitle ? `${pageTitle}` : 'flatbook')

  return (
    <>
      <section className="tailwind placeholder">
        <header>
          <h1>Fullstack Boilerplate - with Flats!</h1>
        </header>
        <main>
          <Outlet />
        </main>
        <footer></footer>
      </section>
    </>
  )
}

export default AppLayout