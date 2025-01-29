import styles from './Footer.module.css';
import Container from '../wrapper/Container';
import Section from '../wrapper/Section';
import Stack from '../wrapper/Stack';
import Logo from '../Logo';
import TextLink from '../textual/TextLink';
import Text from '../textual/Text';
import Button from '../button/Button';


function Footer() {

    return (
        <footer className={styles.footer}>
            <Section>
                <Container>
                    <Stack overflow={"hidden"} align="center" width={"100%"} direction="column">
                        <Logo />
                        <Text>You like my works?</Text>
                        <Button target={"_blank"} href="https://buymeacoffee.com/domov">☕ buy me a coffee</Button>
                    </Stack>
                </Container>
            </Section>
        </footer>
    );
}

export default Footer;
