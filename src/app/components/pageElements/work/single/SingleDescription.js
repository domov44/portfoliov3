import Text from '../../../ui/textual/Text';
import Title from '../../../ui/textual/Title';
import Stack from '../../../ui/wrapper/Stack';
import styles from './SingleDescription.module.css';


function SingleDescription({ description }) {

    return (
        <section className={styles.section}>
            <Title level={3} className="step-3 text_align_center default">Description of the project</Title>
            <div className={styles.description_wrapper}>
                <Text textalign="center">{description}</Text>
            </div>
        </section>
    );
}

export default SingleDescription;
