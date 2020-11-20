import { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Switch, Link, Route } from 'react-router-dom'
import * as Ethereum from './services/Ethereum'
import styles from './App.module.css'
import MediumEditor from 'medium-editor'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'



const NewArticle = () => {
  const [editor, setEditor] = useState(null)
  const contract = useSelector(({ contract }) => contract)
  useEffect(() => {
    setEditor(new MediumEditor(`.${styles.editable}`))
  }, [setEditor])
  return (
    <form 
    onSubmit={(event) => {
      event.preventDefault();
      const content = event.target[0].value;

      if (content === null || content === '') {
        return;
      }
      contract.methods.getAllIds().call().then(ids => {
        const id = ids.length;
        contract.methods.submit(id, content).send().then(r => {
          console.log('in promise', r);
        });
      });
    }}
    >
      <div className={styles.subTitle}>New article</div>
      <div className={styles.mediumWrapper}>
        <textarea className={styles.editable} />
      </div>
      <input type="submit" value="Submit" />
    </form>
  )
}

const Menu = () => {
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

const AllArticles = () => {
  const [articles, setArticles] = useState([])

  const contract = useSelector(({ contract }) => contract)
  useEffect(() => {
    if (contract) {
      let articlesString = [];

      contract.methods.getAllIds().call().then(res => {
        console.log('ids', res);
        res.forEach(
          (id => 
            contract.methods.articleContent(id).call().then(ar => {
              articlesString.push({
                content: ar,
                id
              });
              if (articlesString.length === res.length) {
                console.log('set Articles', articlesString);
                setArticles(articlesString);
              }
            })
          )
        );
        
      });
    }
  }, [contract, setArticles])
  return <div>{articles.map(article => <Article key={article.id} article={article}/>)}</div>
}

const Article = (props) => {
  return <div className={styles.articleWrapper} key={props.article.id}>
    { props.article.content}
  </div>
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
      <Menu />
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
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  )
}

export default App
