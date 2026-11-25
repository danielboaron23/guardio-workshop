import { Header } from './components/Header'
import { useRoute } from './router'
import { Home } from './screens/Home'
import { Settings } from './screens/Settings'
import { Todos } from './screens/Todos'

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

  if (route.page === 'todos') {
    return (
      <div className="min-h-svh bg-background">
        <Header active="todos" />
        <Todos concept={route.concept} tab={route.tab} state={route.state} preview={route.preview} />
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
