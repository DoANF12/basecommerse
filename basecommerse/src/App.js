import "./App.css";
import Nav from './components/Nav'

const App = () =>
{
  return (
    <>
    <header>
      <Nav />
    </header>
    <main>
      <div className="py-16 bg-yellow-900 w-full h-screen">
        <div>
          List Product
        </div>
      </div>
    </main>
      
    </>
  )
}

export default App

