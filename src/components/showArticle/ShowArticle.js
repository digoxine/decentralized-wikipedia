import { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styles from './ShowArticle.module.css'

const ShowArticle = () => {
    const [article, setArticle] = useState([])
    const { id } = useParams();
    const [correct, setCorrect] = useState(false);
    const contract = useSelector(({ contract }) => contract)
    useEffect(() => {
      if (contract) {
        async function getArticleContent(id) {
            if (id) {
                const articleContent = await contract.methods.articleContent(id).call();
                console.log("content", articleContent);
                if (articleContent !== '') {
                    setArticle(articleContent);
                    setCorrect(true);
                } else {
                    setArticle("Article Not Found");
                }
                
            }else {
                setArticle("Id not parsed");
            }
            
        }
        getArticleContent(id);
      }
    }, [contract, setArticle, setCorrect])
    return (
    <div className={styles.layout}>
        {
            correct &&
            <Link to={"/article/modify/" + id}>
                <button className={styles.button} type='button'>
                    Modify
                </button>
            </Link>
        }
        <div className={styles.articleWrapper} key={1}>
            { article }
        </div>
    </div>
    )
}

export default ShowArticle;