import { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styles from './ModifyArticle.module.css'

const ModifyArticle = () => {
    const [article, setArticle] = useState([])
    const { id } = useParams();
    const contract = useSelector(({ contract }) => contract)
    // useEffect(() => {
    //   if (contract) {
    //     // async function getArticleContent(id) {
    //     //     if (id) {
    //     //         const articleContent = await contract.methods.articleContent(id).call();
    //     //         console.log("content", articleContent);
    //     //         if (articleContent !== '') {
    //     //             setArticle(articleContent);
    //     //         } else {
    //     //             setArticle("Article Not Found");
    //     //         }
                
    //     //     }else {
    //     //         setArticle("Id not parsed");
    //     //     }
            
    //     }
    //     getArticleContent(id);
    //   }
    // }, [contract, setArticle])
    return (
    <div className={styles.layout}>
        <div className={styles.articleWrapper} key={1}>
            { "Modify article" }
        </div>
    </div>
    )
}

export default ModifyArticle;