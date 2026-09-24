import React, { useMemo, useState } from 'react'
import { SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import { detectDependencies } from '../utils/sandpackUtils'
import SandpackErrorMonitor from './SandpackErrorMonitor'

const getFileCode = (content) => {
  if (typeof content === 'string') return content
  return content?.code || content?.content || ''
}

const FullPagePreview = ({ files }) => {
  const [showErrorOverlay, setShowErrorOverlay] = useState(true)

  // Convert the project's files to the shape expected by Sandpack.
  const sandpackFiles = useMemo(() => {
    if (!files || typeof files !== 'object') return {}

    return Object.fromEntries(
      Object.entries(files).map(([path, content]) => [
        path,
        { code: getFileCode(content) },
      ])
    )
  }, [files])

  // Detect dependencies from the normalized source files.
  const dependencies = useMemo(
    () => detectDependencies(sandpackFiles),
    [sandpackFiles]
  )

  return (
    <div className="h-screen w-screen overflow-hidden bg-white">
      <SandpackProvider
        template="react"
        files={sandpackFiles}
        customSetup={{ dependencies }}
        options={{
          externalResources: [
            'https://cdn.tailwindcss.com',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
          ],
          classes: {
            'sp-wrapper': 'sp-wrapper',
            'sp-layout': 'sp-layout',
            'sp-preview': 'sp-preview',
          },
          logLevel: 0,
        }}
        className="h-full w-full"
      >
        <SandpackErrorMonitor onErrorChange={setShowErrorOverlay} />
        <SandpackLayout
          style={{
            height: '100%',
            width: '100%',
            border: 'none',
            borderRadius: 0,
            background: 'transparent',
          }}
        >
          <SandpackPreview
            showNavigator={false}
            showRefreshButton={false}
            showOpenInCodeSandbox={false}
            showSandpackErrorOverlay={showErrorOverlay}
            style={{ height: '100%', width: '100%', flex: 1 }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}

export default FullPagePreview
