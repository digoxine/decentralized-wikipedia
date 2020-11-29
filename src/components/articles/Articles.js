import { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './Articles.module.css'

const AllArticles = () => {
    const [articles, setArticles] = useState([])
  
    const contract = useSelector(({ contract }) => contract)
    useEffect(() => {
      if (contract) {
        async function getAllArticles(ids) {
          let res = [];
          for (const id of ids) {
            const articleContent = await contract.methods.articleContent(id).call()
            res.push({
              id,
              content: articleContent
            });
          }
          return res;
        }
  
        contract.methods.getAllIds().call().then(async res => {
          const articlesFetched = await getAllArticles(res);
          setArticles(articlesFetched);
        });
      }
    }, [contract, setArticles])
    return <div>{articles.map(article => <Article key={article.id} article={article}/>)}</div>
}
  
const Article = (props) => {
    return (
    <div className={styles.articleWrapper} key={props.article.id}>
      <Link to={"/article/modify/" + props.article.id}>
        <button className={styles.button} type='button'>
          Modify
        </button>
      </Link>
      <Link to={"/article/" + props.article.id}>
        <div className={styles.articleContent}>
          { props.article.content}
        </div>
      </Link>
    </div>
    )
}

export default AllArticles;