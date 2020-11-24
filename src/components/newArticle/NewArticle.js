// react - redux imports
import { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'

// style imports
import styles from './NewArticle.module.css'
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

export default NewArticle;