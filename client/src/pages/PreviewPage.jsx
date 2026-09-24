import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FullPagePreview from '../components/FullPagePreview'
import Loading from '../components/Loading'
import { useAppContext } from '../context/AppContext'

const PreviewPage = () => {
  const { id } = useParams()
  const { activeProject, loadingActiveProject, loadProject } = useAppContext()

  useEffect(() => {
    if (!id) return
    loadProject(id)
  }, [id, loadProject])

  if (loadingActiveProject || !activeProject || activeProject._id !== id) {
    return <Loading />
  }

  return <FullPagePreview files={activeProject.files} />
}

export default PreviewPage
