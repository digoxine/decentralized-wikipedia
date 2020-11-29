// react - redux imports
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Link, Route } from 'react-router-dom'

// component imports
import AllArticles from '../articles/Articles'
import NewArticle from '../newArticle/NewArticle'
import ShowArticle from '../showArticle/ShowArticle'
import ModifyArticle from '../modifyArticle/ModifyArticle'

// services imports
import * as Ethereum from '../../services/Ethereum'

// style imports
import styles from './App.module.css'





const Router = () => {
  return (
    <div className={styles.links}>
      <Link to="/">Home</Link>
      <Link to="/article/new">Add an article</Link>
      <Link to="/article/all">All articles</Link>
    </div>
  )
}

const Home = () => {
  return (
    <div>
      <p>In this DApp you can submit/read/update articles</p>
    </div>
  )
}

const NotFound = () => {
  return <div>Not found</div>
}

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(Ethereum.connect)
  }, [dispatch])
  return (
    <div className={styles.app}>
      <Router />
      <div className={styles.title}>Welcome to Decentralized Wikipedia</div>
      <Switch>
        <Route path="/article/new">
          <NewArticle />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/article/all">
          <AllArticles />
        </Route>
        <Route path="/article/modify/:id">
          <ModifyArticle/>
        </Route>
        <Route path="/article/:id">
          <ShowArticle/>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  )
}

export default App
