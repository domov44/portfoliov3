"use client"
import Button from '../../../ui/button/Button';
import Chip from '../../../ui/textual/Chip';
import Text from '../../../ui/textual/Text';
import Title from '../../../ui/textual/Title';
import Section from '../../../ui/wrapper/Section';
import Stack from '../../../ui/wrapper/Stack';
import { PiGithubLogoFill } from 'react-icons/pi';
import styles from './SingleHero.module.css'

function SingleHero({ title, href, github, role, context, date, category }) {

    return (
        <Section className="justify_end h95vh">
            <Stack direction="column" height="60%" width="100%" justify="space-between">
                <Stack direction="column" align="center" width="100%">
                    <Stack direction="column" width="100%" className="align_center" spacing="0px">
                        <Chip variant={"danger"}>{category}</Chip>
                        <Title level={1} className="colored font10vw text_align_center">
                            {title}
                        </Title>
                    </Stack>
                    {(href && href !== '' || github && github !== '') && (
                        <div className={styles.button_wrapper}>
                            {(href && href !== '') && (
                                <Button variant="primary" href={href} target="_blank">
                                    view the project
                                </Button>
                            )}
                            {(github && github !== '') && (
                                <Button variant="secondary" href={github} target="_blank">
                                    <PiGithubLogoFill /> look at the github
                                </Button>
                            )}
                        </div>
                    )}
                </Stack>
                <div className={styles.work_info_grid}>
                    {role &&
                        <div className={styles.work_info_item + " uppercase"}>
                            <Title level={3} className={"default step--2"}>Role:</Title><Text className={"step--1"}>{role}</Text>
                        </div>}
                    {context &&
                        <div className={styles.work_info_item + " uppercase"}>
                            <Title level={3} className={"default step--2"}>Context:</Title><Text className={"step--1"}>{context}</Text>
                        </div>}
                    {date &&
                        <div className={styles.work_info_item + " uppercase"}>
                            <Title level={3} className={"default step--2"}>Date:</Title><Text className={"step--1"}>{new Date(date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3/$1/$2')}</Text>
                        </div>}
                </div>
            </Stack>
        </Section>
    );
}

export default SingleHero;
