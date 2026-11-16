import { Header } from './components/Header'
import { useRoute } from './router'
import { Home } from './screens/Home'
import { Settings } from './screens/Settings'

function App() {
  const route = useRoute()

  if (route.page === 'settings') {
    return (
      <div className="min-h-svh bg-surface">
        <Header minimal />
        <Settings tab={route.tab} />
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-background">
      <Header />
      <Home />
    </div>
  )
}

export default App
