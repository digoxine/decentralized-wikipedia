import { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'


import styles from './ModifyArticle.module.css'
import MediumEditor from 'medium-editor'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'


const ModifyArticle = () => {
    const [article, setArticle] = useState([])
    const [found, setFound] = useState(false);
    const { id } = useParams();
    const contract = useSelector(({ contract }) => contract)
    useEffect(() => {
      if (contract) {
        async function getArticleContent(id) {
            if (id) {
                const articleContent = await contract.methods.articleContent(id).call();
                console.log("content", articleContent);
                if (articleContent !== '') {
                    setFound(true);
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
    }, [contract, setArticle, setFound])
    return (
    <div className={styles.layout}>
        <div className={styles.articleWrapper}> 
            {
                !found && 
                "Wrong article"
            }
            {
                found && 
                <ArticleEditor content={article} id={id}/>
            }
        </div>
    </div>
    )
}

const submitModification = (event, contract, id) => {
    event.preventDefault();
    const content = event.target[0].value;

    if (content === null || content === '') {
      return;
    }
    contract.methods.updateArticle(id, content).send().then(ok => {
      console.log("updated ?", ok);
    });
}

const ArticleEditor = (props) => {
    const contract = useSelector(({ contract }) => contract)
    const [editor, setEditor] = useState(null)
    useEffect(() => {
        setEditor(new MediumEditor(`.${styles.editable}`));
    }, [setEditor]);
    
    return (
        <div>
            <div>
                { props.article }
            </div>
            <form onSubmit={(event) => submitModification(event, contract, props.id)}>
                <div className={styles.subTitle}>Update article</div>
                <div className={styles.mediumWrapper}>
                    <textarea className={styles.editable} />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default ModifyArticle;