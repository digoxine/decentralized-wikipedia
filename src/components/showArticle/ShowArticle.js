import { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import styles from './ShowArticle.module.css'

const ShowArticle = () => {
    const [article, setArticle] = useState([])
  
    const { id } = useParams();
    const contract = useSelector(({ contract }) => contract)
    useEffect(() => {
      if (contract) {
        async function getArticleContent(id) {
            if (id) {
                const articleContent = await contract.methods.articleContent(id).call();
                console.log("content", articleContent);
                if (articleContent !== '') {
                    setArticle(articleContent);
                } else {
                    setArticle("Article Not Found");
                }
                
            }else {
                setArticle("Id not parsed");
            }
            
        }
        getArticleContent(id);
      }
    }, [contract, setArticle])
    return <div className={styles.articleWrapper} key={1}>
      { article }
    </div>
}

export default ShowArticle;